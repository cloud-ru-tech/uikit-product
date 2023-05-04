import { useCallback, useEffect, useMemo, useState } from 'react';

import { AgGridTypes, SelectionMode, TablePrivateProps } from '@sbercloud/uikit-product-table-private';
import { extractSupportProps, useLanguage, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { textProvider, Texts } from '../../helpers/texts-provider';
import { ClientModelTableView } from './ClientModelTableView';
import { ExportActions } from './constants';
import { DeleteProps, FilterProps, PaginationProps } from './types';

export type ClientModelTableControllerProps<T> = {
  fieldId: string;
  data: T[];
  selectionMode?: TablePrivateProps['selectionMode'];
  selectedRows?: string[];
  pinnedData?: T[];
  columnDefinitions: TablePrivateProps['columnDefs'];
  pageSize?: number;
  onRefreshCallback?(): void | Promise<void>;
  bulkActions?: {
    delete?: {
      onDelete(ids: string[]): void | Promise<void>;
      title: string | ((arg: { count: number }) => string);
      description: string | ((arg: { count: number }) => string);
      approveText: string;
      cancelText: string;
    };
    filter?: FilterProps<T>;
    export?: {
      fileName: string;
      onExport?(exportType: string): void;
    };
  };
  advancedProps?: {
    getRowHeight?: TablePrivateProps['getRowHeight'];
    getRowId?: TablePrivateProps['getRowId'];
    onRowClicked?: TablePrivateProps['onRowClicked'];
    onRowSelected?: TablePrivateProps['onRowSelected'];
    onRowDoubleClicked?: TablePrivateProps['onRowDoubleClicked'];
  };
  suppressToolbar?: boolean;
};

export function ClientModelTableController<T extends object>({
  fieldId,
  data,
  pinnedData,
  selectedRows = [],
  selectionMode = SelectionMode.Multiple,
  bulkActions,
  pageSize,
  onRefreshCallback,
  columnDefinitions,
  advancedProps,
  suppressToolbar = false,
  ...rest
}: WithSupportProps<ClientModelTableControllerProps<T>>) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  const [gridApi, setGridApi] = useState<AgGridTypes.GridApi | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const onGridReady = useCallback((gridEv: AgGridTypes.GridReadyEvent) => {
    setGridApi(gridEv.api);
  }, []);

  useEffect(() => {
    if (searchValue || bulkActions?.filter?.value?.length) {
      setIsSearching(true);
      return;
    }
    setIsSearching(false);
  }, [searchValue, bulkActions?.filter?.value]);

  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  const onDataChangedHandler = useCallback(() => {
    if (!gridApi) return;

    const totalPages = gridApi.paginationGetTotalPages();

    if (totalPages !== pageCount) {
      setPageCount(totalPages);
    }
    const newPageCount = Math.min(pageCount, totalPages);
    if (currentPage >= newPageCount) {
      setCurrentPage(Math.max(0, newPageCount - 1));
    }
  }, [gridApi, pageCount, currentPage]);

  useEffect(() => {
    if (!gridApi) return;

    gridApi.addEventListener(AgGridTypes.Events.EVENT_ROW_DATA_UPDATED, onDataChangedHandler);
    return () => gridApi.removeEventListener(AgGridTypes.Events.EVENT_ROW_DATA_UPDATED, onDataChangedHandler);
  }, [gridApi, onDataChangedHandler]);

  useEffect(() => {
    if (data?.length && pageSize) {
      setPageCount(Math.ceil(data.length / pageSize));
    }
  }, [data.length, pageSize]);

  const [uncontrolledSelectedRows, setUncontrolledSelectedRows] = useState<ClientModelTableControllerProps<T>['data']>(
    [],
  );

  const onRowSelectHandler = useCallback(() => {
    if (!gridApi) return;

    setUncontrolledSelectedRows(gridApi.getSelectedRows());
  }, [gridApi]);

  useEffect(() => {
    if (!gridApi) return;
    gridApi.addEventListener(AgGridTypes.Events.EVENT_ROW_SELECTED, onRowSelectHandler);
    return () => gridApi.removeEventListener(AgGridTypes.Events.EVENT_ROW_SELECTED, onRowSelectHandler);
  }, [gridApi, onRowSelectHandler]);

  const [deleteDialogOpened, setDeleteDialogOpened] = useState(false);
  const onCancelDelete = useCallback(() => setDeleteDialogOpened(false), []);
  const openDeleteDialog = useCallback(() => setDeleteDialogOpened(true), []);
  const onConfirmDelete = useCallback(async () => {
    if (!bulkActions?.delete) {
      return;
    }

    setDeleteDialogOpened(false);

    const ids = uncontrolledSelectedRows.map(row => row[fieldId]);
    try {
      await bulkActions.delete.onDelete(ids);
    } finally {
      gridApi?.deselectAll();
      setUncontrolledSelectedRows([]);
    }
  }, [bulkActions?.delete, uncontrolledSelectedRows, fieldId, gridApi]);

  const deleteProps: DeleteProps | undefined = bulkActions?.delete
    ? {
        onConfirmDelete,
        onCancelDelete,
        openDeleteDialog,
        deleteDialogOpened,
        title:
          typeof bulkActions.delete.title === 'function'
            ? bulkActions.delete.title({ count: uncontrolledSelectedRows.length })
            : bulkActions.delete.title,
        description:
          typeof bulkActions.delete.description === 'function'
            ? bulkActions.delete.description({ count: uncontrolledSelectedRows.length })
            : bulkActions.delete.description,
        approveText: bulkActions.delete.approveText,
        cancelText: bulkActions.delete.cancelText,
        isDeleteEnabled: Boolean(uncontrolledSelectedRows.length),
      }
    : undefined;

  const pageChangeHandler = useCallback(
    (currentPage: number) => {
      const nextPage = currentPage - 1;

      gridApi?.paginationGoToPage(nextPage);
      setCurrentPage(nextPage);
    },
    [gridApi],
  );

  useEffect(() => {
    gridApi?.paginationSetPageSize(pageSize);
  }, [gridApi, pageSize]);

  const paginationProps: PaginationProps | undefined = useMemo(() => {
    const displayedRowCount = gridApi?.getDisplayedRowCount() ?? 0;
    const showPagination = Boolean(pageSize && displayedRowCount > pageSize);

    return pageSize
      ? {
          pageCount,
          currentPage,
          pageChangeHandler,
          showPagination,
        }
      : undefined;
  }, [gridApi, pageSize, pageCount, currentPage, pageChangeHandler]);

  const searchPinnedData = useMemo(() => {
    if (pinnedData) {
      return pinnedData.filter(item => {
        let shouldPass = true;

        if (searchValue) {
          shouldPass = Object.values(item).some(cellValue => String(cellValue).includes(String(searchValue)));
        }

        if (bulkActions?.filter?.doesRowPassFilter) {
          shouldPass = bulkActions.filter.doesRowPassFilter(item) && shouldPass;
        }

        return shouldPass;
      });
    }

    return [];
    // eslint-disable-next-line
  }, [searchValue, pinnedData, bulkActions?.filter, bulkActions?.filter?.value]);

  const onSearchCallback = useCallback(
    (value: string) => {
      setSearchValue(value);
      if (!gridApi) return;
      gridApi.setQuickFilter(value);
      gridApi.paginationGoToPage(0);
      setCurrentPage(0);
      setPageCount(gridApi.paginationGetTotalPages());
    },
    [gridApi],
  );
  const moreActions = useMemo(() => {
    if (!gridApi || !bulkActions) {
      return undefined;
    }

    const { export: exportProps } = bulkActions;

    if (!exportProps) {
      return undefined;
    }

    const columnDefs = gridApi.getColumnDefs() as ClientModelTableControllerProps<T>['columnDefinitions'];
    const columnKeys = columnDefs.filter(x => !x['customMeta']?.skipOnExport).map(x => x['colId'] || x['field']);

    return [
      {
        value: ExportActions.Csv,
        label: textProvider(languageCode, Texts.ExportCSV),
        onClick: () => {
          exportProps.onExport?.(ExportActions.Csv);

          gridApi.exportDataAsCsv({
            fileName: exportProps.fileName,
            columnKeys,
          });
        },
      },
      {
        value: ExportActions.Xls,
        label: textProvider(languageCode, Texts.ExportExcel),
        onClick: () => {
          exportProps.onExport?.(ExportActions.Xls);

          gridApi.exportDataAsExcel({
            fileName: exportProps.fileName,
            columnKeys,
          });
        },
      },
    ];
  }, [gridApi, bulkActions?.export, languageCode]);

  useEffect(() => {
    setTimeout(() => {
      if (!gridApi || !bulkActions?.filter) return;
      gridApi.onFilterChanged();

      const totalPages = gridApi.paginationGetTotalPages();
      if (currentPage >= totalPages) {
        const newCurrentPage = Math.max(0, totalPages - 1);
        setCurrentPage(newCurrentPage);
        gridApi.paginationGoToPage(newCurrentPage);
      }
      setPageCount(totalPages);
    });
  }, [bulkActions?.filter, currentPage, gridApi]);

  const newFilterProps = bulkActions?.filter && {
    doesRowPassFilter: bulkActions?.filter.doesRowPassFilter,
    toolbarFilter: {
      onChange: bulkActions?.filter?.onChange,
      value: bulkActions?.filter.value,
      filterOptions: bulkActions?.filter.filterOptions,
    },
  };

  return (
    <ClientModelTableView
      fieldId={fieldId}
      data={data}
      pinnedData={searchPinnedData}
      columnDefinitions={columnDefinitions}
      getRowHeight={advancedProps?.getRowHeight}
      getRowId={advancedProps?.getRowId}
      onGridReady={onGridReady}
      onRefreshCallback={onRefreshCallback}
      onRowClicked={advancedProps?.onRowClicked}
      onRowSelected={advancedProps?.onRowSelected}
      selectedRows={selectedRows}
      selectionMode={selectionMode}
      onRowDoubleClicked={advancedProps?.onRowDoubleClicked}
      deleteProps={deleteProps}
      filterProps={newFilterProps}
      paginationProps={paginationProps}
      onSearchCallback={onSearchCallback}
      moreActions={moreActions}
      searchValue={searchValue}
      suppressToolbar={suppressToolbar}
      isSearching={isSearching}
      {...extractSupportProps(rest)}
    />
  );
}

ClientModelTableController.selectionModes = SelectionMode;
