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
import { useCallback, useEffect, useMemo } from 'react';

import { useLocale } from '@sbercloud/uikit-product-locale';
import { FiltersState, MobileChipChoiceRowProps } from '@sbercloud/uikit-product-mobile-chips';
import { MobileToolbar, MobileToolbarProps } from '@sbercloud/uikit-product-mobile-toolbar';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { SkeletonContextProvider } from '@snack-uikit/skeleton';
import {
  getPinnedGroups,
  PaginationState,
  TableProps,
  useColumnOrderByDrag,
  useColumnSettings,
  usePageReset,
} from '@snack-uikit/table';

import {
  getRowActionsColumnDef,
  getStatusColumnDef,
  TableCard,
  TableEmptyState,
  TablePagination,
  TableSorting,
  useEmptyState,
} from '../helperComponents';
import { ColumnsSettings } from '../helperComponents/ColumnsSettings';
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
  | 'columnsSettings'
  | 'savedState'
  | 'autoResetPageIndex'
  | 'toolbarAfter'
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
  autoResetPageIndex = false,
  getRowId,
  rowSelection: rowSelectionProp,
  bulkActions: bulkActionsProp,
  columnsSettings: columnsSettingsProp,
  savedState,
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

  const enableSelection = Boolean(rowSelectionProp?.enable);

  const pinnedGroups = useMemo(() => getPinnedGroups(columnDefinitions), [columnDefinitions]);

  const {
    enabledColumns,
    setEnabledColumns,
    getColumnsSettings,
    enabledTableColumns,
    enabledColumnsDefinitions,
    areColumnsSettingsEnabled,
  } = useColumnSettings({
    columnDefinitions,
    pinnedGroups,
    savedState,
    columnsSettings: columnsSettingsProp,
    rowSelection: undefined,
    enableSelectPinned: false,
    expanding: undefined,
  });

  const { columnOrder, setColumnOrder, enableColumnsOrderSortByDrag } = useColumnOrderByDrag<TData>({
    tableColumns: columnDefinitions,
    savedState,
    columnSettings: columnsSettingsProp,
  });

  const columnsSettings = useMemo(() => getColumnsSettings(columnOrder), [columnOrder, getColumnsSettings]);

  // Получаем список колонок с mode: 'hidden', которые всегда доступны для сортировки
  const hiddenColumnsBySettings = useMemo(() => {
    if (!areColumnsSettingsEnabled) return new Set<string>();

    const hidden = new Set<string>();
    columnDefinitions.forEach(colDef => {
      let columnId: string | undefined;
      if ('id' in colDef && colDef.id) {
        columnId = colDef.id;
      } else if ('accessorKey' in colDef && colDef.accessorKey) {
        columnId = String(colDef.accessorKey);
      }

      if (columnId) {
        const colDefWithSettings = colDef as typeof colDef & {
          columnSettings?: { mode?: 'hidden' | string };
        };
        if (colDefWithSettings.columnSettings?.mode === 'hidden') {
          hidden.add(columnId);
        }
      }
    });
    return hidden;
  }, [areColumnsSettingsEnabled, columnDefinitions]);

  // Сбрасываем сортировку, если колонка с активной сортировкой была скрыта
  // Колонки с mode: 'hidden' всегда доступны для сортировки
  useEffect(() => {
    if (areColumnsSettingsEnabled && enabledColumns && sorting.length > 0) {
      const activeSortColumnId = sorting[0]?.id;
      if (activeSortColumnId) {
        const isHiddenColumn = hiddenColumnsBySettings.has(activeSortColumnId);
        const isEnabledColumn = enabledColumns.includes(activeSortColumnId);
        // Сбрасываем сортировку только если колонка не скрыта через mode: 'hidden' и не включена
        if (!isHiddenColumn && !isEnabledColumn) {
          // Колонка с активной сортировкой скрыта - сбрасываем сортировку
          onSortingChange([]);
        }
      }
    }
  }, [areColumnsSettingsEnabled, enabledColumns, sorting, onSortingChange, hiddenColumnsBySettings]);

  const table = useReactTable<TData>({
    data,
    columns: enabledTableColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),

    state: {
      pagination,
      globalFilter,
      sorting,
      rowSelection,
      columnOrder: enableColumnsOrderSortByDrag ? columnOrder : undefined,
    },
    pageCount,
    onPaginationChange,
    onSortingChange,
    onColumnOrderChange: enableColumnsOrderSortByDrag ? setColumnOrder : undefined,
    globalFilterFn: enableFuzzySearch ? fuzzyFilter : 'includesString',

    enableFilters: true,
    manualSorting,
    manualPagination,
    manualFiltering,
    getRowId,

    autoResetPageIndex,

    onRowSelectionChange,
    enableGrouping: true,
    enableRowSelection,
    enableMultiRowSelection: rowSelectionProp?.enable && rowSelectionProp?.multiRow,
    enableSubRowSelection: true,
  });

  const { loadingTable } = useLoadingTable<TData, TFilters>({
    pageSize: DEFAULT_PAGE_SIZE,
    columnDefinitions: enabledColumnsDefinitions,
  });

  const tableRows = table.getRowModel().rows;
  const loadingTableRows = loadingTable.getRowModel().rows;

  const { t } = useLocale('Table');
  const emptyStates = useEmptyState({ noDataState, noResultsState, errorDataState });

  const handleOnRefresh = useCallback(() => {
    table.resetRowSelection();
    onRefresh?.();
  }, [onRefresh, table]);

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

  const hasSortableColumns = useMemo(
    () => columnDefinitions.some(column => column.enableSorting !== false),
    [columnDefinitions],
  );

  const shouldShowSorting = useMemo(
    () => Boolean(sortingProp) || hasSortableColumns,
    [sortingProp, hasSortableColumns],
  );

  const tableFilteredRows = table.getFilteredRowModel().rows;

  usePageReset({
    manualPagination,
    maximumAvailablePage: pageCount || tableFilteredRows.length / pagination.pageSize,
    pagination,
    onPaginationChange,
    autoResetPageIndex,
  });

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
            after={
              toolbarAfter || shouldShowSorting || (areColumnsSettingsEnabled && columnsSettings) ? (
                <>
                  {toolbarAfter}
                  {shouldShowSorting && (
                    <TableSorting
                      table={table}
                      columnDefinitions={columnDefinitions}
                      enabledColumns={areColumnsSettingsEnabled ? enabledColumns : undefined}
                      areColumnsSettingsEnabled={areColumnsSettingsEnabled}
                    />
                  )}
                  {areColumnsSettingsEnabled && columnsSettings && (
                    <ColumnsSettings
                      columnsSettings={columnsSettings}
                      enabledColumns={enabledColumns}
                      setEnabledColumns={setEnabledColumns}
                    />
                  )}
                </>
              ) : undefined
            }
            moreActions={moreActions}
            bulkActions={bulkActions}
            selectedCount={table.getSelectedRowModel().rows.length}
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
                selectionAppearance={rowSelectionProp?.appearance}
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
MobileTable.getStatusColumnDef = getStatusColumnDef;
