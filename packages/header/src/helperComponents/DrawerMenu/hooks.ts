import Fuse from 'fuse.js';
import debounce from 'lodash.debounce';
import { MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useLocale } from '@sbercloud/uikit-product-locale';
import { isBrowser } from '@snack-uikit/utils';

import { InnerLink, LinksGroup } from '../../types';
import { SearchSettings } from './components/SearchSettingsChips';
import { SearchGroupsAccessor } from './constants';
import { DrawerMenuProps } from './types';
import {
  filterHiddenLinks,
  getSearchSettingsFromLocalStorage,
  saveSearchSettingsToLocalStorage,
  toggleLayout,
} from './utils';

type UseSearchProps = {
  links?: LinksGroup[];
  searchSettings: SearchSettings;
};

type UseScrollProps = {
  links?: LinksGroup[];
  searchValue: string;
  setSearchValue(value: string): void;
  drawerOpen: boolean;
  highlightClassName: string;
};

function matchSearchString(value: string, search: string) {
  return value.trim().toLowerCase().includes(search.trim().toLowerCase());
}

export function useHighlight(className: string) {
  const element = useRef<HTMLElement>();

  const highlight = useMemo(
    () => {
      const scheduleHighlight = debounce(() => {
        element.current?.classList.add(className);
        setTimeout(
          () => {
            element.current?.classList.remove(className);
            element.current = undefined;
          },
          300,
          { trailing: false },
        );
      }, 80);

      return (elementToHighlight?: HTMLElement | null) => {
        if (elementToHighlight) {
          element.current = elementToHighlight;
        }
        scheduleHighlight();
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return highlight;
}

const prepareItemAccessorKey = (groupId: string, alias: string): string => `${groupId}-${alias}`;

type ItemsMap = Record<string, InnerLink>;

function createItemsMap(links: LinksGroup[]): ItemsMap {
  const itemsMap: ItemsMap = {};

  links.forEach(group => {
    group.items.forEach(item => {
      item.aliases.forEach(alias => {
        const key = prepareItemAccessorKey(group.id, alias);
        itemsMap[key] = item;
      });
    });
  });

  return itemsMap;
}

export function useSearch({ links = [], searchSettings }: UseSearchProps) {
  const [searchValue, setSearchValue] = useState('');

  const itemsMap = useMemo(() => createItemsMap(links), [links]);
  const linksFuse = useMemo(
    () =>
      new Fuse(links, {
        keys: Object.values(SearchGroupsAccessor),
        includeMatches: true,
        threshold: 0.3,
      }),
    [links],
  );

  const filterFuzzy = useCallback(
    (searchValue: string, links: LinksGroup[]) => {
      let fuseSearchResults = linksFuse.search(searchValue);

      if (fuseSearchResults.length < 1) {
        const fixedLayoutValue = toggleLayout(searchValue);
        fuseSearchResults = linksFuse.search(fixedLayoutValue);
      }

      return fuseSearchResults.reduce((accResult, fuseResult) => {
        if (!fuseResult.matches) {
          return accResult;
        }

        const isMatchByGroup = fuseResult.matches.find(match => match.key === SearchGroupsAccessor.GroupLabelText);
        if (isMatchByGroup) {
          accResult.push(fuseResult.item);
          return accResult;
        }

        const group = fuseResult.item;

        const originalGroupIndex = fuseResult.refIndex;
        const itemsInnerMap: Record<string, InnerLink> = {};
        const items: InnerLink[] = [];

        fuseResult.matches.forEach(match => {
          if (match.refIndex === undefined) {
            return;
          }

          switch (match.key) {
            case SearchGroupsAccessor.ItemLabelText: {
              const item = links[originalGroupIndex].items[match.refIndex];
              if (item && !itemsInnerMap[item.id]) {
                itemsInnerMap[item.id] = item;
                items.push(item);
              }
              break;
            }

            case SearchGroupsAccessor.ItemAliases: {
              if (!match.value) {
                break;
              }

              const groupId = fuseResult.item.id;
              const alias = match.value;
              const key = prepareItemAccessorKey(groupId, alias);

              const item = itemsMap[key];
              if (item && !itemsInnerMap[item.id]) {
                itemsInnerMap[item.id] = item;
                items.push(item);
              }
              break;
            }

            case SearchGroupsAccessor.GroupLabelText:
            default:
              return;
          }
        });

        if (items.length > 0) {
          accResult.push({
            ...group,
            items,
          });
        }

        return accResult;
      }, [] as LinksGroup[]);
    },
    [itemsMap, linksFuse],
  );

  const filterPrecise = useCallback((searchValue: string, links: LinksGroup[]) => {
    if (!searchValue || links.length < 1) {
      return links;
    }

    return links.reduce((result, group) => {
      if (group.label && matchSearchString(group.label.text, searchValue)) {
        result.push(group);
        return result;
      }

      const items = group.items.filter(item => matchSearchString(item.label, searchValue));

      if (items.length > 0) {
        result.push({ ...group, items });
        return result;
      }

      return result;
    }, [] as LinksGroup[]);
  }, []);

  const filteredLinks = useMemo(() => {
    switch (searchSettings.precision) {
      case 'fuzzy':
        return filterFuzzy(searchValue, links);

      case 'precise':
      default:
        return filterPrecise(searchValue, links);
    }
  }, [filterFuzzy, filterPrecise, links, searchSettings.precision, searchValue]);

  return {
    searchValue,
    setSearchValue,
    filteredLinks,
  };
}

export function useLinksScrollToSelected({ setSearchValue, drawerOpen, highlightClassName }: UseScrollProps) {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const scrollRef = useRef<HTMLElement>(null);
  const searchPanelRef = useRef<HTMLDivElement>(null);
  const highlight = useHighlight(highlightClassName);

  useEffect(() => {
    const scroll = scrollRef.current;

    if (!scroll || !drawerOpen) {
      return;
    }

    const scrollHandler = () => highlight();

    scroll.addEventListener('scroll', scrollHandler);
    return () => scroll.removeEventListener('scroll', scrollHandler);
  }, [drawerOpen, highlight]);

  const handleLinkClick = (link: LinksGroup) => (event: MouseEvent) => {
    event.preventDefault();
    setSearchValue('');

    if (isBrowser()) {
      highlight(document.getElementById(link.id));

      setTimeout(() => {
        scrollRef.current?.scrollTo({
          left: 0,
          top: (document.getElementById(link.id)?.offsetTop || 0) - (searchPanelRef.current?.offsetHeight || 0),
          behavior: 'smooth',
        });
      }, 0);
    }
  };

  return {
    cardsRef,
    scrollRef,
    searchPanelRef,
    handleLinkClick,
  };
}

export const useWithFavorites = ({ links, favorites }: Pick<DrawerMenuProps, 'links' | 'favorites'>) => {
  const { t } = useLocale('Header');
  const favoriteItemIds = useMemo(() => favorites?.value ?? [], [favorites?.value]);

  const favoriteItems = useMemo(() => {
    if (!links || favoriteItemIds.length === 0) {
      return [];
    }

    const idsToLinks = links
      .flatMap(group => group.items)
      .reduce(
        (res, link) => {
          res[link.id] = link;
          return res;
        },
        {} as Record<string, InnerLink>,
      );

    const favouriteItems = favoriteItemIds.map(id => idsToLinks[id]).filter(item => Boolean(item));

    if (favouriteItems.length === 0) {
      return [];
    }

    return [
      {
        label: { text: t('favorite') },
        id: 'favorite',
        items: favouriteItems,
      },
    ];
  }, [favoriteItemIds, t, links]);

  return useMemo(() => (links ? [...favoriteItems, ...links] : undefined), [favoriteItems, links]);
};

const debouncedSaveSearchSettings = debounce(saveSearchSettingsToLocalStorage, 500);

export function useLinks({ links, favorites }: Pick<DrawerMenuProps, 'links' | 'favorites'>) {
  const [searchSettings, setSearchSettings] = useState<SearchSettings>(() => getSearchSettingsFromLocalStorage()); // () => JSON.parse(lsSearchSettings)
  const [areSearchSettingsVisible, setAreSearchSettingsVisible] = useState<boolean>(false);

  useEffect(() => {
    debouncedSaveSearchSettings(searchSettings);
  }, [searchSettings]);

  const visibleLinks = useMemo(() => filterHiddenLinks(links), [links]);
  const visibleLinksWithFavorites = useWithFavorites({ links: visibleLinks, favorites });
  const { searchValue, setSearchValue, filteredLinks } = useSearch({ links: visibleLinks, searchSettings });

  const shownLinks = searchValue.length > 0 ? filteredLinks : visibleLinksWithFavorites;

  return {
    searchValue,
    setSearchValue,
    rightSectionLinks: shownLinks,
    leftSectionLinks: visibleLinksWithFavorites,
    searchSettings,
    setSearchSettings,
    areSearchSettingsVisible,
    setAreSearchSettingsVisible,
  };
}
