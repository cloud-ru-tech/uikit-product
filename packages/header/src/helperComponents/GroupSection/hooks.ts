import { useEffect, useMemo, useRef, useState } from 'react';
import useTransition from 'react-transition-state';
import { useUncontrolledProp } from 'uncontrollable';

import { Item, ItemsGroup } from './types';

type UseSearchProps = {
  groups: ItemsGroup<Item>[];
  searchable?: boolean;
  active?: boolean;
  onActiveChange?(value?: boolean): void;
};

function matchSearchString(value: string, search: string) {
  return value.trim().toLowerCase().includes(search.trim().toLowerCase());
}

export function useSearch({ groups, searchable, active, onActiveChange }: UseSearchProps) {
  const [searchValue, setSearchValue] = useState('');
  const [isSearchActive, setIsSearchActive] = useUncontrolledProp<boolean>(active, false, onActiveChange);
  const searchRef = useRef<HTMLInputElement>(null);
  const searchIconTabIndex = isSearchActive ? -1 : undefined;
  const closeSearchIconTabIndex = isSearchActive ? undefined : -1;
  const searchInputTabIndex = isSearchActive ? undefined : -1;

  const [animationState, toggle] = useTransition({
    mountOnEnter: true,
    unmountOnExit: true,
    initialEntered: isSearchActive,
    timeout: { enter: 300, exit: 300 },
  });

  useEffect(() => toggle(isSearchActive), [isSearchActive]);

  const handleActivateSearch = () => setIsSearchActive(true);
  const handleDeactivateSearch = () => setIsSearchActive(false);

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
    handleDeactivateSearch,
    animationState,
    filteredGroups,
    searchIconTabIndex,
    closeSearchIconTabIndex,
    searchInputTabIndex,
  };
}
