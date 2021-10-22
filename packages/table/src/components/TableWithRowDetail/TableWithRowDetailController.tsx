import { ReactNode, useCallback, useLayoutEffect, useMemo, useState } from 'react';

import { AgGridTypes } from '@sbercloud/uikit-react-table-private';
import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-utils';

import { TableWithRowDetailView } from './TableWithRowDetailView';
import * as Types from './types';

const TableRadioColumnDefine = {
  cellRenderer: 'agGroupCellRenderer',
  cellRendererParams: { innerRenderer: 'GroupDisabledCell' },
};

export type TableWithRowDetailControllerProps<T> = {
  data: T[];
  columnDefinitions: Types.ColumnDefinitions;
  pageSize?: number;
  onSelectionChanged?(selectedRows?: T[]): void;
  children?: ReactNode;
};

export function TableWithRowDetailController<T>({
  data,
  columnDefinitions,
  pageSize,
  onSelectionChanged,
  children,
  ...rest
}: WithSupportProps<TableWithRowDetailControllerProps<T>>) {
  const [gridApi, setGridApi] = useState<AgGridTypes.GridApi>();
  const [searchValue, setSearchValue] = useState('');

  const onGridReady: Types.OnGridReady = gridEv => {
    setGridApi(gridEv.api);
  };

  const handlerSelectionChanged = useCallback(() => {
    const selectedRows = gridApi?.getSelectedRows();
    onSelectionChanged?.(selectedRows);
  }, [gridApi, onSelectionChanged]);

  const onCellClicked: Types.OnCellClicked = useCallback(
    event => {
      if (event.data.disabled || event.node.detail || event.column.getUserProvidedColDef()?.onCellClicked) {
        return;
      }

      if (!event.node.expanded) {
        gridApi?.forEachNode(node => {
          if (node.expanded) {
            node.setExpanded(false);
          }
        });
      }

      const nextOpenState = !event.node.expanded;
      event.node.setExpanded(nextOpenState);
      event.node.setSelected(nextOpenState);
    },
    [gridApi],
  );

  const onRowGroupOpened: Types.OnRowGroupOpened = useCallback(
    event => {
      if (event.node.expanded) {
        gridApi?.forEachNode(node => {
          if (node.expanded && node.id !== event.node.id) {
            node.setExpanded(false);
          }
        });
      }

      const nextOpenState = event.node.expanded;
      event.node.setExpanded(nextOpenState);
      event.node.setSelected(nextOpenState);
    },
    [gridApi],
  );

  const columnDefs = useMemo(() => {
    if (!columnDefinitions) {
      return undefined;
    }

    const newColDef = [...columnDefinitions];
    newColDef[0] = { ...newColDef[0], ...TableRadioColumnDefine };

    return newColDef;
  }, [columnDefinitions]);

  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  useLayoutEffect(() => {
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
  }, [gridApi, pageCount, pageSize, data.length]);

  const pageChangeHandler = useCallback(
    ({ selected }: { selected: number }) => {
      gridApi?.paginationGoToPage(selected);
      setCurrentPage(selected);
    },
    [gridApi],
  );

  const paginationProps: Types.PaginationProps | undefined = useMemo(() => {
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

  const onSearchCallback: Types.OnSearchCallback = useCallback(
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

  const detailCellRendererFramework = useCallback(() => children, [children]);

  return (
    <TableWithRowDetailView
      data={data}
      columnDefinitions={columnDefs}
      onGridReady={onGridReady}
      onCellClicked={onCellClicked}
      onSelectionChanged={handlerSelectionChanged}
      onRowGroupOpened={onRowGroupOpened}
      detailCellRendererFramework={detailCellRendererFramework}
      searchValue={searchValue}
      onSearchCallback={onSearchCallback}
      paginationProps={paginationProps}
      {...extractSupportProps(rest)}
    />
  );
}
