import { useCallback, useMemo, useState } from 'react';

import { DEFAULT_PAGINATION_LIMIT } from './constants';
import {
  FiltersState,
  PaginationParams,
  TableSortingState,
  UseEntitiesTableProps,
  UseEntitiesTableResult,
} from './types';
import { getOrderingParams } from './utils';

export function useEntitiesTable<T extends object, P extends FiltersState>({
  defaultSearch,
  defaultOffset,
  defaultLimit,
  defaultSort,
}: UseEntitiesTableProps<T, P> = {}): UseEntitiesTableResult<T, P> {
  const [search, setSearch] = useState(defaultSearch || '');
  const [sorting, setSorting] = useState(defaultSort);
  const [offset, setOffset] = useState(defaultOffset || 0);
  const [limit, setLimit] = useState(defaultLimit || DEFAULT_PAGINATION_LIMIT);

  const onChangePage = useCallback((newOffset: number, newLimit: number) => {
    setOffset(newOffset);
    setLimit(newLimit);
  }, []);

  const onSearchChange = useCallback((value: string) => {
    setSearch(value);
    setOffset(0);
  }, []);

  const onReset = useCallback(() => {
    setSearch(defaultSearch || '');
    setSorting(defaultSort);
    setOffset(defaultOffset || 0);
    setLimit(defaultLimit || DEFAULT_PAGINATION_LIMIT);
  }, [defaultLimit, defaultOffset, defaultSearch, defaultSort]);

  const onSortChange = useCallback((state: TableSortingState<T, P>) => {
    setSorting(state);
  }, []);

  const paginationParams = useMemo(
    (): PaginationParams => ({
      offset,
      limit,
      ...Object.fromEntries(
        Object.entries({
          search,
          ordering: getOrderingParams<T, P>(sorting),
        }).filter(([, value]) => Boolean(value)),
      ),
    }),
    [limit, offset, search, sorting],
  );

  return useMemo(
    () => ({
      search,
      offset,
      limit,
      sorting,
      onChangePage,
      onSearchChange,
      onSortChange,
      onReset,
      paginationParams,
    }),
    [limit, offset, onChangePage, onReset, onSearchChange, onSortChange, paginationParams, search, sorting],
  );
}
