import debounce from 'lodash.debounce';
import { MouseEvent, useEffect, useMemo, useRef, useState } from 'react';

import { useLanguage } from '@sbercloud/uikit-product-utils';
import { isBrowser } from '@snack-uikit/utils';

import { textProvider, Texts } from '../../helpers';
import { InnerLink, LinksGroup } from '../../types';
import { DrawerMenuProps } from './types';

type UseSearchProps = {
  links?: LinksGroup[];
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

export function useSearch({ links }: UseSearchProps) {
  const [searchValue, setSearchValue] = useState('');

  const filteredLinks = useMemo(
    () =>
      links && searchValue.length > 0
        ? links.reduce((result, group) => {
            if (group.label && matchSearchString(group.label, searchValue)) {
              result.push(group);
              return result;
            }

            const items = group.items.filter(item => matchSearchString(item.label, searchValue));

            if (items.length > 0) {
              result.push({ ...group, items });
              return result;
            }

            return result;
          }, [] as LinksGroup[])
        : links,
    [links, searchValue],
  );

  return {
    searchValue,
    setSearchValue,
    filteredLinks,
  };
}

export function useLinks({ setSearchValue, drawerOpen, highlightClassName }: UseScrollProps) {
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

export const useWithFavorites = ({ links = [], favorites }: Pick<DrawerMenuProps, 'links' | 'favorites'>) => {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  const favouriteItemIds = useMemo(() => favorites?.itemIds ?? [], [favorites?.itemIds]);

  const idsToLinks = useMemo(
    () =>
      links
        .flatMap(group => group.items)
        .reduce(
          (res, link) => {
            res[link.id] = link;
            return res;
          },
          {} as Record<string, InnerLink>,
        ),
    [links],
  );

  const favoriteItems = useMemo(
    () =>
      favouriteItemIds.length > 0
        ? [
            {
              label: textProvider(languageCode, Texts.Favorite),
              id: 'favorite',
              items: favouriteItemIds.map(id => idsToLinks[id]),
            },
          ]
        : [],
    [favouriteItemIds, idsToLinks, languageCode],
  );

  return useMemo(() => [...favoriteItems, ...links], [favoriteItems, links]);
};
