import { useEffect, useMemo, useRef, useState } from 'react';

import { useLocalStorage } from '../../hooks';
import { Organization, Project } from '../../types';
import { SortVariant } from './components';
import { ItemsGroup } from './types';

type UseSearchProps = {
  groups: ItemsGroup<Project>[];
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
            const items = group.items.filter(item => matchSearchString(item.name, searchValue));

            if (items.length > 0) {
              result.push({ ...group, items });
              return result;
            }

            return result;
          }, [] as ItemsGroup<Project>[])
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

export function useProjectsSort({
  projects,
  selectedOrganization,
}: {
  projects?: ItemsGroup<Project>[];
  selectedOrganization?: Omit<Organization, 'href'>;
}) {
  const noCatalogsInSort = projects && projects.length <= 1;

  const [sort, setSort] = useLocalStorage<SortVariant>(
    'header_projects_sort',
    noCatalogsInSort ? SortVariant.LastVisitedDesc : SortVariant.ByCatalogs,
  );

  useEffect(() => {
    if (selectedOrganization?.id && noCatalogsInSort && sort === SortVariant.ByCatalogs) {
      setSort(SortVariant.LastVisitedDesc);
    }
  }, [noCatalogsInSort, selectedOrganization?.id, setSort, sort]);

  return { sort, setSort };
}
