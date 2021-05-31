import { GridApi } from 'ag-grid-community';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useState } from 'react';

import { Languages } from '../../helpers/texts-provider';
import { ITableProps } from '../Default';
import { ClientModelTableView } from './ClientModelTableView';
import { DeleteProps, PaginationProps } from './types';

export type ClientModelTableControllerProps<T> = {
  fieldId: string;
  data: T[];
  columnDefinitions: ITableProps['columnDefs'];
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
  };
  language?: Languages;
};

export function ClientModelTableController<T>({
  language = Languages.Ru,
  fieldId,
  data,
  bulkActions,
  pageSize,
  onRefreshCallback,
  columnDefinitions,
}: ClientModelTableControllerProps<T>) {
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const onGridReady = useCallback(gridEv => {
    setGridApi(gridEv.api);
  }, []);

  gridApi?.addEventListener(
    'columnEverythingChanged',
    debounce(() => {
      if (!gridApi) return;
      gridApi.sizeColumnsToFit();
      const totalPages = gridApi.paginationGetTotalPages();
      if (totalPages === 0) {
        gridApi.showNoRowsOverlay();
      } else {
        gridApi.hideOverlay();
      }
    }, 100),
  );

  gridApi?.addEventListener(
    'filterChanged',
    debounce(() => {
      const totalPages = gridApi.paginationGetTotalPages();
      if (totalPages === 0) {
        gridApi.showNoRowsOverlay();
      } else {
        gridApi.hideOverlay();
      }
    }, 50),
  );

  gridApi?.addEventListener(
    'rowDataUpdated',
    debounce(() => {
      if (!gridApi) return;
      gridApi.sizeColumnsToFit();

      const totalPages = gridApi.paginationGetTotalPages();
      if (totalPages === 0) {
        gridApi.showNoRowsOverlay();
      } else {
        gridApi.hideOverlay();
      }
    }, 100),
  );

  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (!gridApi) {
      if (data?.length && pageSize) {
        setPageCount(Math.ceil(data.length / pageSize));
      }
    } else {
      const totalPages = gridApi.paginationGetTotalPages();
      setPageCount(totalPages);
    }
  }, [data, pageSize, gridApi]);

  const [selectedRows, setSelectedRows] = useState<ClientModelTableControllerProps<T>['data']>([]);

  gridApi?.addEventListener(
    'rowSelected',
    debounce(() => {
      setSelectedRows(gridApi?.getSelectedRows());
    }, 100),
  );

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
  }, [deleteDialogOpened, selectedRows, gridApi]);

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

  const showPagination = Boolean((pageSize && data?.length > pageSize) || pageCount > 1);
  const pageChangeHandler = useCallback(
    ({ selected }: { selected: number }) => {
      gridApi?.paginationGoToPage(selected);
      setCurrentPage(selected);
    },
    [gridApi],
  );
  const paginationProps: PaginationProps | undefined = pageSize
    ? {
        pageCount,
        currentPage,
        pageChangeHandler,
        showPagination,
      }
    : undefined;

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

  return (
    <ClientModelTableView
      language={language}
      fieldId={fieldId}
      data={data}
      columnDefinitions={columnDefinitions}
      pageSize={pageSize}
      onGridReady={onGridReady}
      onRefreshCallback={onRefreshCallback}
      useRowSelection={useRowSelection}
      deleteProps={deleteProps}
      paginationProps={paginationProps}
      onSearchCallback={onSearchCallback}
      searchValue={searchValue}
    />
  );
}
