import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { SkeletonText } from '@snack-uikit/skeleton';
import { TableProps } from '@snack-uikit/table';

import { ROW_ACTIONS_COLUMN_ID } from '../constants';

export function useStateControl<TState>(
  control: { initialState?: TState; state?: TState; onChange?(state: TState): void } | undefined,
  defaultState: TState,
) {
  const [state, onStateChange] = useUncontrolledProp<TState>(
    control?.state,
    control?.state ?? control?.initialState ?? defaultState,
    (controlState: TState) => {
      const newState = typeof controlState === 'function' ? controlState(state) : controlState;

      control?.onChange?.(newState);
    },
  );

  return {
    state,
    onStateChange,
  };
}

type UseLoadingTableProps<TData extends object> = {
  columnDefinitions: TableProps<TData>['columnDefinitions'];
  pageSize: number;
};

export function useLoadingTable<TData extends object>({ pageSize, columnDefinitions }: UseLoadingTableProps<TData>) {
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
