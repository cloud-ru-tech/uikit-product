import { UseQueryResult } from '@tanstack/react-query';

import { FiltersState, ServerTableProps } from '@cloud-ru/uikit-product-mobile-table';

export type { FiltersState };

export type PaginationParams = {
  offset: number;
  limit: number;
  search?: string;
  ordering?: string;
};

export type TableSortingState<T extends object, P extends FiltersState> = NonNullable<
  ServerTableProps<T, P>['sorting']
>['state'];

export type EntityListData<T> = {
  total: number;
  data: T[];
};

export type UseEntitiesTableProps<T extends object, P extends FiltersState> = {
  defaultSearch?: string;
  defaultOffset?: number;
  defaultLimit?: number;
  defaultSort?: TableSortingState<T, P>;
};

export type UseEntitiesTableResult<T extends object, P extends FiltersState> = {
  search: string;
  offset: number;
  limit: number;
  sorting: TableSortingState<T, P> | undefined;
  onChangePage: (newOffset: number, newLimit: number) => void;
  onSearchChange: (value: string) => void;
  onSortChange: (state: TableSortingState<T, P>) => void;
  onReset: () => void;
  paginationParams: PaginationParams;
};

export type EntitiesTableHandle<T extends object> = {
  getParams(): PaginationParams;
  getData(): T[];
  refetchData(): void;
  resetState(): void;
};

export type EntitiesTableProps<T extends object, P extends FiltersState> = {
  id: string;
  queryFn: (queryProps: P) => UseQueryResult<EntityListData<T>>;
  queryProps?: Omit<P, 'params'>;
  onQuerySuccess?(): void;
  onPaginationOrDataChange?(data: T[]): void;
} & UseEntitiesTableProps<T, P> &
  Omit<
    ServerTableProps<T, P>,
    | 'items'
    | 'loading'
    | 'dataError'
    | 'onChangePage'
    | 'onRefresh'
    | 'search'
    | 'sorting'
    | 'offset'
    | 'limit'
    | 'total'
    | 'savedState'
    | 'outline'
    | 'columnSettings'
  > & {
    searchPlaceholder?: string | undefined;
  };
