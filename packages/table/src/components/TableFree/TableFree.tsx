import 'ag-grid-community/dist/styles/ag-grid.min.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.min.css';

import { cx } from '@linaria/core';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Paginator } from '@sbercloud/uikit-react-paginator-private';

import { TableCheckboxColumnDefinition, tableHeaderHeight, tableRowHeight } from '../../helpers/constants';
import { tableClass } from '../../styles/tableClass';
import { paginationClass } from './styled';

export interface ITableFreeProps extends AgGridReactProps {
  classNameContainer?: string;
  checkboxSelection?: boolean;
  pageSize?: number;
}

export const TableFree: React.FC<ITableFreeProps> = ({
  rowData = [],
  columnDefs = [],
  gridOptions = {},
  onGridReady,
  checkboxSelection = false,
  classNameContainer,
  pageSize = undefined,
  ...tableProps
}) => {
  const [gridApi, setGridApi] = useState<ITableFreeProps['api']>();
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    gridApi?.paginationSetPageSize(pageSize);
  }, [pageSize]);

  const handleGridReady: ITableFreeProps['onGridReady'] = params => {
    setGridApi(params.api);
    onGridReady?.(params);
  };

  const handleComponentStateChanged: ITableFreeProps['onComponentStateChanged'] = params => {
    setGridApi(params.api);
    setTotalPages(params.api.paginationGetTotalPages());
  };

  const onFirstDataRendered = useCallback(params => {
    params.api.sizeColumnsToFit();
  }, []);

  const colDefs = useMemo(() => {
    if (checkboxSelection) {
      return [{ ...TableCheckboxColumnDefinition }, ...columnDefs];
    }

    return [...columnDefs];
  }, [checkboxSelection, columnDefs]);

  return (
    <>
      <div className={cx('ag-theme-alpine', tableClass, classNameContainer, !!pageSize && paginationClass)}>
        <AgGridReact
          gridOptions={{
            suppressCellSelection: true,
            headerHeight: tableHeaderHeight,
            rowHeight: tableRowHeight,
            rowSelection: 'multiple',
            suppressRowClickSelection: true,
            defaultColDef: {
              flex: 1,
              resizable: true,
              sortable: true,
              unSortIcon: true,
            },
            ...gridOptions,
          }}
          columnDefs={colDefs}
          domLayout='autoHeight'
          enableCellTextSelection
          loadingOverlayComponent='LoadingOverlay'
          localeText={{ noRowsToShow: 'Нет данных' }}
          onFirstDataRendered={onFirstDataRendered}
          onGridReady={handleGridReady}
          onComponentStateChanged={handleComponentStateChanged}
          onGridSizeChanged={params => {
            params.api.sizeColumnsToFit();
          }}
          pagination // проп всегда включен, поскольку невозможно включить динамически
          paginationPageSize={pageSize}
          rowData={rowData}
          sortingOrder={['desc', 'asc', null]}
          suppressPaginationPanel
          {...tableProps}
        />
      </div>
      {!!pageSize && totalPages > 1 && (
        <Paginator
          pageCount={totalPages}
          onPageChange={({ selected }: { selected: number }) => {
            gridApi?.paginationGoToPage(selected);
          }}
          placement={Paginator.placements.Left}
        />
      )}
    </>
  );
};
