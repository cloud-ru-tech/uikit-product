import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  RowSelectionState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import cn from 'classnames';
import { useCallback, useMemo } from 'react';

import { FiltersState, MobileChipChoiceRowProps } from '@sbercloud/uikit-product-mobile-chips';
import { MobileToolbar, MobileToolbarProps } from '@sbercloud/uikit-product-mobile-toolbar';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { useLocale } from '@snack-uikit/locale';
import { SkeletonContextProvider } from '@snack-uikit/skeleton';
import { PaginationState, TableProps } from '@snack-uikit/table';

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

export type MobileTableProps<TData extends object, TFilters extends FiltersState = Record<string, unknown>> = Pick<
  TableProps<TData, TFilters>,
  | 'data'
  | 'columnDefinitions'
  | 'suppressPagination'
  | 'suppressToolbar'
  | 'suppressSearch'
  | 'search'
  | 'onRefresh'
  | 'toolbarAfter'
  | 'moreActions'
  | 'className'
  | 'enableFuzzySearch'
  | 'loading'
  | 'dataError'
  | 'dataFiltered'
  | 'noDataState'
  | 'noResultsState'
  | 'errorDataState'
  | 'sorting'
  | 'pagination'
  | 'pageCount'
  | 'manualFiltering'
  | 'manualPagination'
  | 'manualSorting'
  | 'getRowId'
  | 'rowSelection'
  | 'bulkActions'
> &
  WithSupportProps<{
    headlineId?: string;
    headerBackground?: 'default' | '1-level' | '2-level';
    columnFilters?: MobileChipChoiceRowProps<FiltersState>;
  }>;

export function MobileTable<TData extends object, TFilters extends FiltersState = Record<string, unknown>>({
  data,
  columnDefinitions,
  headlineId,
  suppressPagination = false,
  suppressToolbar = false,
  suppressSearch = false,
  enableFuzzySearch = false,
  search,
  onRefresh,
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
  pagination: paginationProp,
  pageCount,
  sorting: sortingProp,
  manualSorting = false,
  manualPagination = false,
  manualFiltering = false,
  getRowId,
  rowSelection: rowSelectionProp,
  bulkActions: bulkActionsProp,
  ...rest
}: MobileTableProps<TData, TFilters>) {
  const defaultPaginationState = useMemo(() => ({ pageIndex: 0, pageSize: DEFAULT_PAGE_SIZE }), []);

  const { state: sorting, onStateChange: onSortingChange } = useStateControl<SortingState>(sortingProp, []);
  const { state: globalFilter, onStateChange: onGlobalFilterChange } = useStateControl<string>(search, '');
  const { state: pagination, onStateChange: onPaginationChange } = useStateControl<PaginationState>(
    paginationProp,
    defaultPaginationState,
  );

  const { state: rowSelection, onStateChange: onRowSelectionChange } = useStateControl<RowSelectionState>(
    rowSelectionProp,
    {},
  );

  const enableRowSelection = useCallback(
    (row: Row<TData>) => {
      const parent = row.getParentRow();
      const isParentSelected = parent ? parent.getCanSelect() : true;
      let isCurrentRowSelected = true;
      if (rowSelectionProp?.enable !== undefined) {
        isCurrentRowSelected =
          typeof rowSelectionProp.enable === 'boolean' ? rowSelectionProp.enable : rowSelectionProp.enable(row);
      }
      return isParentSelected && isCurrentRowSelected;
    },
    [rowSelectionProp],
  );

  const table = useReactTable<TData>({
    data,
    columns: columnDefinitions,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),

    state: { pagination, globalFilter, sorting, rowSelection },
    pageCount,
    onPaginationChange,
    onSortingChange,
    globalFilterFn: enableFuzzySearch ? fuzzyFilter : 'includesString',

    enableFilters: true,
    manualSorting,
    manualPagination,
    manualFiltering,
    getRowId,

    onRowSelectionChange,
    enableGrouping: true,
    enableRowSelection,
    enableMultiRowSelection: rowSelectionProp?.enable && rowSelectionProp?.multiRow,
    enableSubRowSelection: true,
  });

  const { loadingTable } = useLoadingTable<TData, TFilters>({
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

  const enableSelection = Boolean(rowSelectionProp?.enable);

  const bulkActions: MobileToolbarProps<TFilters>['bulkActions'] = useMemo(
    () =>
      enableSelection
        ? bulkActionsProp?.map(action => ({
            ...action,
            onClick: () => action.onClick?.(table.getState().rowSelection, table.resetRowSelection),
          }))
        : undefined,
    [bulkActionsProp, enableSelection, table],
  );
  const handleOnToolbarCheck = useCallback(() => {
    if (!loading && table.getTopRows().length) {
      const centerRows = table.getCenterRows();
      const isSomeRowsSelected = table.getIsSomePageRowsSelected();
      const isAllCenterRowsSelected = centerRows.every(row => row.getIsSelected());

      if (isAllCenterRowsSelected) {
        table.resetRowSelection();
        return;
      }

      centerRows.forEach(row => row.toggleSelected(isSomeRowsSelected ? true : undefined));
      return;
    }

    if (!loading && rowSelectionProp?.multiRow) {
      table.toggleAllPageRowsSelected();
      return;
    }
  }, [loading, rowSelectionProp?.multiRow, table]);

  const selectionMode: MobileToolbarProps<TFilters>['selectionMode'] = rowSelectionProp?.multiRow
    ? 'multiple'
    : 'single';

  return (
    <div className={cn(styles.tableWrapper, className)} {...extractSupportProps(rest)}>
      {(!suppressToolbar || columnFilters) && (
        <div className={styles.header} data-background={headerBackground}>
          <MobileToolbar
            search={
              suppressSearch
                ? undefined
                : {
                    value: globalFilter,
                    onChange: onGlobalFilterChange,
                    loading: search?.loading,
                    placeholder: search?.placeholder || t('searchPlaceholder'),
                  }
            }
            onRefresh={onRefresh ? handleOnRefresh : undefined}
            outline
            filterRow={columnFilters}
            after={toolbarAfter}
            moreActions={moreActions}
            bulkActions={bulkActions}
            selectionMode={selectionMode}
            onCheck={enableSelection ? handleOnToolbarCheck : undefined}
            checked={table.getIsAllPageRowsSelected()}
            indeterminate={table.getIsSomePageRowsSelected()}
          />
        </div>
      )}

      <div className={styles.table}>
        {loading ? (
          <SkeletonContextProvider loading>
            {loadingTableRows.map((row, index) => (
              <TableCard key={index} headlineId={headlineId} row={row} table={loadingTable} selection='none' />
            ))}
          </SkeletonContextProvider>
        ) : (
          <>
            {tableRows.map((row, index) => (
              <TableCard
                key={index}
                headlineId={headlineId}
                row={row}
                table={table}
                selection={enableSelection ? selectionMode : 'none'}
              />
            ))}

            <TableEmptyState
              emptyStates={emptyStates}
              dataError={dataError}
              dataFiltered={dataFiltered || Boolean(table.getState().globalFilter)}
              tableRowsLength={tableRows.length}
            />
          </>
        )}
      </div>

      {!suppressPagination && <TablePagination table={table} />}
    </div>
  );
}

MobileTable.getRowActionsColumnDef = getRowActionsColumnDef;
