import { useMemo, useRef, useState } from 'react';

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

export function useSearch({ groups, searchable }: UseSearchProps) {
  const [searchValue, setSearchValue] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  const filteredGroups = useMemo(
    () =>
      searchable && searchValue.length > 0
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
    [groups, searchValue, searchable],
  );

  return {
    searchRef,
    searchValue,
    setSearchValue,
    filteredGroups,
  };
}
