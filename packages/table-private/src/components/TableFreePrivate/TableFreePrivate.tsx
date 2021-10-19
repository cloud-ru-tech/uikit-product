import 'ag-grid-community/dist/styles/ag-grid.min.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.min.css';

import { cx } from '@linaria/core';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import { useCallback, useMemo } from 'react';

import { TableCheckboxColumnDefinition, tableHeaderHeight, tableRowHeight } from '../../helpers/constants';
import { tableClass } from '../../helpers/tableClass';
import { NoRows } from '../overlays';
import { NoDataReasons } from '../overlays/NoRows/types';

export interface TableFreePrivateProps extends AgGridReactProps {
  className?: string;
  checkboxSelection?: boolean;
}

export function TableFreePrivate({
  rowData = [],
  columnDefs = [],
  gridOptions = {},
  onGridReady,
  checkboxSelection = false,
  className,
  ...tableProps
}: TableFreePrivateProps) {
  const handleGridReady: TableFreePrivateProps['onGridReady'] = params => {
    onGridReady?.(params);
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
      <div className={cx('ag-theme-alpine', tableClass, className)}>
        <AgGridReact
          gridOptions={{
            suppressCellSelection: true,
            headerHeight: tableHeaderHeight,
            rowHeight: tableRowHeight,
            rowSelection: 'multiple',
            suppressRowClickSelection: true,
            pagination: true,
            ensureDomOrder: true,
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
          noRowsOverlayComponentFramework={NoRows}
          noRowsOverlayComponentParams={{
            reason: rowData.length === 0 ? NoDataReasons.InitialEmpty : NoDataReasons.Search,
          }}
          onFirstDataRendered={onFirstDataRendered}
          onGridReady={handleGridReady}
          onGridSizeChanged={params => {
            params.api.sizeColumnsToFit();
          }}
          rowData={rowData}
          sortingOrder={['desc', 'asc', null]}
          suppressPaginationPanel
          {...tableProps}
        />
      </div>
    </>
  );
}
