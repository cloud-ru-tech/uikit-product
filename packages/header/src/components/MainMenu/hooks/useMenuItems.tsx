import { useEffect, useMemo, useRef } from 'react';

import { useLocale } from '@cloud-ru/uikit-product-locale';
import { BaseItemProps } from '@snack-uikit/list';

import styles from '../styles.module.scss';
import { InnerLink, LinksGroup, MainMenuProps, SearchHandler } from '../types';
import { pinAdminGroupToBottom } from '../utils';
import { useHighlight } from './useHighlight';

type UseMenuItemsProps = Pick<
  MainMenuProps,
  'favorite' | 'serviceGroups' | 'search' | 'settingItems' | 'platformGroups'
>;

export function useMenuItems({
  search,
  serviceGroups,
  favorite,
  settingItems,
  platformGroups = [],
}: UseMenuItemsProps) {
  const { t } = useLocale('Header');

  const { searchValue = '', searchFn, searchFunctions, onSearchValueChange, onSearchNoResult } = search || {};

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
    .map(({ id, label: { text }, onClick: onGroupClickInSidebar }) => ({
      id,
      content: {
        option: text,
        truncate: {
          option: 2,
        },
      },

      onClick(e) {
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

        onGroupClickInSidebar?.(e);
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

  const hasPlatformGroups = platformGroups.length > 0;

  const resultItems = useMemo(() => {
    if (!searchValue) {
      return itemsWithoutEmptyGroups;
    }

    const handler = searchFn ? searchFnMap?.[searchFn] : searchFunctions?.[0]?.handler;

    const serviceResults = handler?.(searchValue, itemsWithoutEmptyGroups) ?? itemsWithoutEmptyGroups;

    const platformResults = hasPlatformGroups ? (handler?.(searchValue, platformGroups) ?? []) : [];

    const adminResults = settingItems?.items.length ? (handler?.(searchValue, [settingItems]) ?? []) : [];

    const combined = [...serviceResults, ...platformResults, ...adminResults];

    return settingItems ? pinAdminGroupToBottom(combined, settingItems.id) : combined;
  }, [
    searchFn,
    searchFnMap,
    searchFunctions,
    searchValue,
    itemsWithoutEmptyGroups,
    platformGroups,
    hasPlatformGroups,
    settingItems,
  ]);

  useEffect(() => {
    if (searchValue && !resultItems.length) {
      onSearchNoResult?.(searchValue);
    }
  }, [searchValue, resultItems.length, onSearchNoResult]);

  return {
    resultItems,
    groupItems,
    searchRef,
    scrollRef,
  };
}
