import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import cn from 'classnames';
import { useCallback, useMemo } from 'react';

import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { useLocale } from '@snack-uikit/locale';
import { SkeletonContextProvider } from '@snack-uikit/skeleton';
import { PaginationState, TableProps } from '@snack-uikit/table';
import { Toolbar } from '@snack-uikit/toolbar';

import {
  getRowActionsColumnDef,
  TableCard,
  TableEmptyState,
  TablePagination,
  useEmptyState,
} from '../helperComponents';
import { DEFAULT_PAGE_SIZE } from './constants';
import { useLoadingTable, useStateControl } from './hooks';
import styles from './styles.module.scss';
import { fuzzyFilter } from './utils';

export type MobileTableProps<TData extends object> = Pick<
  TableProps<TData>,
  | 'data'
  | 'columnDefinitions'
  | 'suppressPagination'
  | 'suppressToolbar'
  | 'search'
  | 'onRefresh'
  | 'toolbarBefore'
  | 'toolbarAfter'
  | 'moreActions'
  | 'columnFilters'
  | 'className'
  | 'enableFuzzySearch'
  | 'loading'
  | 'dataError'
  | 'dataFiltered'
  | 'noDataState'
  | 'noResultsState'
  | 'errorDataState'
> &
  WithSupportProps<{
    headlineId?: string;
    headerBackground?: 'default' | '1-level' | '2-level';
  }>;

export function MobileTable<TData extends object>({
  data,
  columnDefinitions,
  headlineId,
  suppressPagination = false,
  suppressToolbar = false,
  enableFuzzySearch = false,
  search,
  onRefresh,
  toolbarBefore,
  toolbarAfter,
  moreActions,
  columnFilters,
  className,
  headerBackground = 'default',
  noDataState,
  noResultsState,
  errorDataState,
  loading,
  dataError,
  dataFiltered,
  ...rest
}: MobileTableProps<TData>) {
  const defaultPaginationState = useMemo(() => ({ pageIndex: 0, pageSize: DEFAULT_PAGE_SIZE }), []);

  const { state: globalFilter, onStateChange: onGlobalFilterChange } = useStateControl<string>(search, '');
  const { state: pagination, onStateChange: onPaginationChange } = useStateControl<PaginationState>(
    undefined,
    defaultPaginationState,
  );

  const table = useReactTable<TData>({
    data,
    columns: columnDefinitions,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { pagination, globalFilter },
    onPaginationChange,
    globalFilterFn: enableFuzzySearch ? fuzzyFilter : 'includesString',

    enableFilters: true,
    manualSorting: false,
    manualPagination: false,
    manualFiltering: false,
  });

  const { loadingTable } = useLoadingTable({
    pageSize: DEFAULT_PAGE_SIZE,
    columnDefinitions,
  });

  const tableRows = table.getRowModel().rows;
  const loadingTableRows = loadingTable.getRowModel().rows;

  const { t } = useLocale('Table');
  const emptyStates = useEmptyState({ noDataState, noResultsState, errorDataState });

  const handleOnRefresh = useCallback(() => {
    table.resetRowSelection();
    onRefresh?.();
  }, [onRefresh, table]);

  return (
    <div className={cn(styles.tableWrapper, className)} {...extractSupportProps(rest)}>
      {(!suppressToolbar || columnFilters) && (
        <div className={styles.header} data-background={headerBackground}>
          {!suppressToolbar && (
            <Toolbar
              search={{
                value: globalFilter,
                onChange: onGlobalFilterChange,
                loading: search?.loading,
                placeholder: search?.placeholder || t('searchPlaceholder'),
              }}
              checked={table.getIsAllPageRowsSelected()}
              indeterminate={table.getIsSomePageRowsSelected()}
              onRefresh={onRefresh ? handleOnRefresh : undefined}
              outline
              before={toolbarBefore}
              after={toolbarAfter}
              moreActions={moreActions}
            />
          )}

          {columnFilters && <div className={styles.filtersWrapper}>{columnFilters}</div>}
        </div>
      )}

      <div className={styles.table}>
        {loading ? (
          <SkeletonContextProvider loading>
            {loadingTableRows.map((row, index) => (
              <TableCard key={index} headlineId={headlineId} row={row} table={loadingTable} />
            ))}
          </SkeletonContextProvider>
        ) : (
          tableRows.map((row, index) => <TableCard key={index} headlineId={headlineId} row={row} table={table} />)
        )}

        <TableEmptyState
          emptyStates={emptyStates}
          dataError={dataError}
          dataFiltered={dataFiltered || Boolean(table.getState().globalFilter)}
          tableRowsLength={tableRows.length}
        />
      </div>

      {!suppressPagination && <TablePagination table={table} />}
    </div>
  );
}

MobileTable.getRowActionsColumnDef = getRowActionsColumnDef;
