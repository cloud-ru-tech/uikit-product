import { useEffect, useMemo, useRef, useState } from 'react';
import useTransition from 'react-transition-state';

import { Item, ItemsGroup } from './types';

type UseSearchProps = {
  groups: ItemsGroup<Item>[];
  searchable?: boolean;
};

function matchSearchString(value: string, search: string) {
  return value.trim().toLowerCase().includes(search.trim().toLowerCase());
}

export function useSearch({ groups, searchable }: UseSearchProps) {
  const [searchValue, setSearchValue] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const searchIconTabIndex = isSearchActive ? -1 : undefined;
  const searchInputTabIndex = isSearchActive ? undefined : -1;

  const [animationState, toggle] = useTransition({
    mountOnEnter: true,
    unmountOnExit: true,
    initialEntered: false,
    timeout: { enter: 300, exit: 300 },
  });

  useEffect(() => toggle(isSearchActive), [isSearchActive]);

  const handleActivateSearch = () => setIsSearchActive(true);
  const handleSearchBlur = () => {
    if (searchValue.length) return;

    setTimeout(() => {
      setIsSearchActive(false);
    }, 0);
  };

  const filteredGroups = useMemo(
    () =>
      searchable && isSearchActive && searchValue.length > 0
        ? groups.reduce((result, group) => {
            if (group.heading && matchSearchString(group.heading, searchValue)) {
              result.push(group);
              return result;
            }

            const items = group.items.filter(item => matchSearchString(item.name, searchValue));

            if (items.length > 0) {
              result.push({ ...group, items });
              return result;
            }

            return result;
          }, [] as ItemsGroup<Item>[])
        : groups,
    [groups, isSearchActive, searchValue, searchable],
  );

  useEffect(() => {
    if (isSearchActive) {
      searchRef.current?.focus();
    }
  }, [isSearchActive]);

  return {
    searchRef,
    searchValue,
    setSearchValue,
    setIsSearchActive,
    handleActivateSearch,
    handleSearchBlur,
    animationState,
    filteredGroups,
    searchIconTabIndex,
    searchInputTabIndex,
  };
}
