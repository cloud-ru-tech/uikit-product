import { GridApi } from 'ag-grid-community';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useLanguage } from '@sbercloud/uikit-utils';

import { EnabledLanguages } from '../../helpers/texts-provider';
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
  advancedProps?: {
    getRowHeight?: ITableProps['getRowHeight'];
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
}: ClientModelTableControllerProps<T>) {
  const { code: langCode } = useLanguage({ onlyEnabledLanguage: true });

  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const onGridReady = useCallback(gridEv => {
    setGridApi(gridEv.api);
  }, []);

  const onColumnChangedHandler = useCallback(
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
      if (currentPage >= pageCount) {
        setCurrentPage(Math.max(0, pageCount - 1));
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
    const showPagination = Boolean(pageSize && data?.length > pageSize);
    return pageSize
      ? {
          pageCount,
          currentPage,
          pageChangeHandler,
          showPagination,
        }
      : undefined;
  }, [pageCount, currentPage, pageChangeHandler, data?.length, pageSize]);

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
      language={langCode as EnabledLanguages}
      fieldId={fieldId}
      data={data}
      columnDefinitions={columnDefinitions}
      pageSize={pageSize}
      getRowHeight={advancedProps?.getRowHeight}
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
