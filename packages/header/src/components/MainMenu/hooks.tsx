import debounce from 'lodash.debounce';
import { useMemo, useRef } from 'react';

import { useLocale } from '@sbercloud/uikit-product-locale';
import { BaseItemProps } from '@snack-uikit/list';

import { SearchHandler } from './Search/types';
import styles from './styles.module.scss';
import { InnerLink, LinksGroup, MainMenuProps } from './types';

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

type UseMenuItemsProps = Pick<MainMenuProps, 'favorite' | 'serviceGroups' | 'search'>;

export function useMenuItems({ search, serviceGroups, favorite }: UseMenuItemsProps) {
  const { t } = useLocale('Header');

  const { searchValue = '', searchFn, searchFunctions, onSearchValueChange } = search || {};

  const searchRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const highlight = useHighlight(styles.highlight);

  const groupWithFavorites = useMemo(() => {
    if (!favorite || !favorite.value) {
      return serviceGroups;
    }

    const flatMapItems = serviceGroups.flatMap(serviceGroup => serviceGroup.items);

    const favoriteServices = favorite.value.reduce((acc, cur) => {
      const item = flatMapItems.find(item => item.id === cur);
      if (item) {
        acc.push(item);
      }
      return acc;
    }, [] as InnerLink[]);

    return [
      {
        id: 'favorite',
        label: {
          text: t('favorite'),
        },
        items: favoriteServices,
      } as LinksGroup,
    ].concat(serviceGroups);
  }, [favorite, serviceGroups, t]);

  const groupItems: BaseItemProps[] = groupWithFavorites
    .filter(group => group.items.length > 0)
    .map(({ id, label: { text } }) => ({
      id,
      content: {
        option: text,
        truncate: {
          option: 2,
        },
      },

      onClick() {
        onSearchValueChange?.('');

        setTimeout(() => {
          // TODO: remove or move
          // eslint-disable-next-line @cloud-ru/ssr-safe-react/domApi
          const element = document.getElementById(id);
          if (!element) return;

          scrollRef.current?.scrollTo({
            left: 0,
            top: element.offsetTop - (searchRef.current?.offsetHeight || 0),
            behavior: 'smooth',
          });

          // Задержка approximately равна времени скроллинга
          setTimeout(() => {
            highlight(element);
          }, 500);
        }, 0);
      },
    }));

  const searchFnMap = searchFunctions?.reduce(
    (acc, cur) => {
      acc[cur.id] = cur.handler;

      return acc;
    },
    {} as Record<string, SearchHandler>,
  );

  const itemsWithoutEmptyGroups = groupWithFavorites.filter(group => group.items.length > 0);

  const resultItems =
    (searchFn ? searchFnMap?.[searchFn] : searchFunctions?.[0]?.handler)?.(searchValue, itemsWithoutEmptyGroups) ||
    itemsWithoutEmptyGroups;

  return {
    resultItems,
    groupItems,
    searchRef,
    scrollRef,
  };
}
