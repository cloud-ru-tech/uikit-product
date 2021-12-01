import debounce from 'lodash.debounce';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { AgGridTypes, TablePrivateProps } from '@sbercloud/uikit-react-table-private';
import { WithSupportProps, extractSupportProps, useLanguage } from '@sbercloud/uikit-utils';

import { Texts, textProvider } from '../../helpers/texts-provider';
import { ClientModelTableView } from './ClientModelTableView';
import { DeleteProps, FilterProps, PaginationProps } from './types';

export type ClientModelTableControllerProps<T> = {
  fieldId: string;
  data: T[];
  columnDefinitions: TablePrivateProps['columnDefs'];
  pageSize?: number;
  onRefreshCallback?(): void | Promise<void>;
  bulkActions?: {
    delete?: {
      onDelete(ids: string[]): void | Promise<void>;
      title: string;
      description: string;
      approveText: string;
      cancelText: string;
    };
    filter?: FilterProps<T>;
    exportFileName?: string;
  };
  advancedProps?: {
    getRowHeight?: TablePrivateProps['getRowHeight'];
  };
};

export function ClientModelTableController<T>({
  fieldId,
  data,
  bulkActions,
  pageSize,
  onRefreshCallback,
  columnDefinitions,
  advancedProps,
  ...rest
}: WithSupportProps<ClientModelTableControllerProps<T>>) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  const [gridApi, setGridApi] = useState<AgGridTypes.GridApi | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const onGridReady = useCallback(gridEv => {
    setGridApi(gridEv.api);
  }, []);

  const onColumnChangedHandler = useCallback(
    debounce(() => {
      if (!gridApi) return;

      const totalPages = gridApi.paginationGetTotalPages();
      if (totalPages === 0) {
        gridApi.showNoRowsOverlay();
      } else {
        gridApi.hideOverlay();
      }
    }, 100),
    [gridApi],
  );

  useEffect(() => {
    if (!gridApi) return;
    gridApi.addEventListener('columnEverythingChanged', onColumnChangedHandler);
    return () => gridApi.removeEventListener('columnEverythingChanged', onColumnChangedHandler);
  }, [onColumnChangedHandler, gridApi]);

  const onFilterChangeHandler = useCallback(
    debounce(() => {
      if (!gridApi) return;
      const totalPages = gridApi.paginationGetTotalPages();
      if (totalPages === 0) {
        gridApi.showNoRowsOverlay();
      } else {
        gridApi.hideOverlay();
      }
    }, 50),
    [gridApi],
  );

  useEffect(() => {
    if (!gridApi) return;
    gridApi.addEventListener('filterChanged', onFilterChangeHandler);
    return () => gridApi.removeEventListener('filterChanged', onFilterChangeHandler);
  }, [gridApi, onFilterChangeHandler]);

  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  const onDataChangedHandler = useCallback(
    debounce(() => {
      if (!gridApi) return;

      const totalPages = gridApi.paginationGetTotalPages();

      if (totalPages !== pageCount) {
        setPageCount(totalPages);
      }
      const newPageCount = Math.min(pageCount, totalPages);
      if (currentPage >= newPageCount) {
        setCurrentPage(Math.max(0, newPageCount - 1));
      }

      if (totalPages === 0) {
        gridApi.showNoRowsOverlay();
      } else {
        gridApi.hideOverlay();
      }
    }, 200),
    [gridApi, pageCount, currentPage, data.length],
  );

  useEffect(() => {
    if (!gridApi) return;
    gridApi.addEventListener('rowDataUpdated', onDataChangedHandler);
    return () => gridApi.removeEventListener('rowDataUpdated', onDataChangedHandler);
  }, [gridApi, onDataChangedHandler]);

  useEffect(() => {
    if (data?.length && pageSize) {
      setPageCount(Math.ceil(data.length / pageSize));
    }
  }, [data.length, pageSize]);

  const [selectedRows, setSelectedRows] = useState<ClientModelTableControllerProps<T>['data']>([]);

  const onRowSelectHandler = useCallback(
    debounce(() => {
      if (!gridApi) return;
      setSelectedRows(gridApi.getSelectedRows());
    }, 100),
    [gridApi],
  );

  useEffect(() => {
    if (!gridApi) return;
    gridApi.addEventListener('rowSelected', onRowSelectHandler);
    return () => gridApi.removeEventListener('rowSelected', onRowSelectHandler);
  }, [gridApi, onRowSelectHandler]);

  const [deleteDialogOpened, setDeleteDialogOpened] = useState(false);
  const onCancelDelete = useCallback(() => setDeleteDialogOpened(false), []);
  const openDeleteDialog = useCallback(() => setDeleteDialogOpened(true), []);
  const onConfirmDelete = useCallback(async () => {
    if (!bulkActions?.delete) return;
    setDeleteDialogOpened(false);

    const ids = selectedRows.map(row => row[fieldId]);
    try {
      await bulkActions.delete.onDelete(ids);
    } finally {
      gridApi?.deselectAll();
      setSelectedRows([]);
    }
  }, [bulkActions?.delete, selectedRows, fieldId, gridApi]);

  const deleteProps: DeleteProps | undefined = bulkActions?.delete
    ? {
        onConfirmDelete,
        onCancelDelete,
        openDeleteDialog,
        deleteDialogOpened,
        title: bulkActions.delete.title,
        description: bulkActions.delete.description,
        approveText: bulkActions.delete.approveText,
        cancelText: bulkActions.delete.cancelText,
        isDeleteEnabled: Boolean(selectedRows.length),
      }
    : undefined;

  const pageChangeHandler = useCallback(
    ({ selected }: { selected: number }) => {
      gridApi?.paginationGoToPage(selected);
      setCurrentPage(selected);
    },
    [gridApi],
  );

  const paginationProps: PaginationProps | undefined = useMemo(() => {
    gridApi?.paginationSetPageSize(pageSize);
    const showPagination = Boolean(pageSize && data?.length > pageSize);
    return pageSize
      ? {
          pageCount,
          currentPage,
          pageChangeHandler,
          showPagination,
        }
      : undefined;
  }, [gridApi, pageSize, data?.length, pageCount, currentPage, pageChangeHandler]);

  const useRowSelection = Boolean(deleteProps);

  const onSearchCallback = useCallback(
    value => {
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
    if (!gridApi || !bulkActions?.exportFileName) return undefined;

    const columnDefs = gridApi.getColumnDefs() as ClientModelTableControllerProps<T>['columnDefinitions'];
    const columnKeys = columnDefs.filter(x => !x['customMeta']?.skipOnExport).map(x => x['colId'] || x['field']);

    return [
      {
        id: 'client-table__toolbar-more-action-export-csv',
        name: textProvider(languageCode, Texts.ExportCSV),
        onClick: () =>
          gridApi.exportDataAsCsv({
            fileName: bulkActions.exportFileName,
            columnKeys,
          }),
      },
      {
        id: 'client-table__toolbar-more-action-export-xls',
        name: textProvider(languageCode, Texts.ExportExcel),
        onClick: () =>
          gridApi.exportDataAsExcel({
            fileName: bulkActions.exportFileName,
            columnKeys,
          }),
      },
    ];
  }, [gridApi, bulkActions?.exportFileName, languageCode]);

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
      columnDefinitions={columnDefinitions}
      getRowHeight={advancedProps?.getRowHeight}
      onGridReady={onGridReady}
      onRefreshCallback={onRefreshCallback}
      useRowSelection={useRowSelection}
      deleteProps={deleteProps}
      filterProps={newFilterProps}
      paginationProps={paginationProps}
      onSearchCallback={onSearchCallback}
      moreActions={moreActions}
      searchValue={searchValue}
      {...extractSupportProps(rest)}
    />
  );
}
