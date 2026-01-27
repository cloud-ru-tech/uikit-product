import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';

import { FiltersState } from '@cloud-ru/uikit-product-mobile-chips';
import { SkeletonText } from '@snack-uikit/skeleton';
import { TableProps } from '@snack-uikit/table';

import { ROW_ACTIONS_COLUMN_ID } from '../../../constants';

type UseLoadingTableProps<TData extends object, TFilters extends FiltersState> = {
  columnDefinitions: TableProps<TData, TFilters>['columnDefinitions'];
  pageSize: number;
};

export function useLoadingTable<TData extends object, TFilters extends FiltersState>({
  pageSize,
  columnDefinitions,
}: UseLoadingTableProps<TData, TFilters>) {
  const data = useMemo(() => (Array.from({ length: pageSize }).map(() => ({})) || []) as TData[], [pageSize]);
  const columns = useMemo(
    () =>
      columnDefinitions
        .filter(column => column.id !== ROW_ACTIONS_COLUMN_ID)
        .map(column => ({
          ...column,
          cell: () => <SkeletonText lines={1} width={'100%'} />,
        })),
    [columnDefinitions],
  );

  const loadingTable = useReactTable<TData>({
    data,
    columns,

    getCoreRowModel: getCoreRowModel(),
  });

  return { loadingTable };
}
