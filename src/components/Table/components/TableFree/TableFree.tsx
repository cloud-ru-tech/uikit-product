import { useCallback, useMemo } from 'react';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import { cx } from '@linaria/core';

import {
  tableHeaderHeight,
  tableRowHeight,
  TableCheckboxColumnDefinition,
} from 'components/Table/helpers/constants';
import { tableClass } from 'components/Table/styles/tableClass';

import 'ag-grid-community/dist/styles/ag-grid.min.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.min.css';

export interface ITableFreeProps extends AgGridReactProps {
  classNameContainer?: string;
  checkboxSelection?: boolean;
}

export const TableFree: React.FC<ITableFreeProps> = ({
  rowData = [],
  columnDefs = [],
  gridOptions = {},
  onGridReady,
  checkboxSelection = false,
  classNameContainer,
  ...tableProps
}) => {
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
    <div className={cx('ag-theme-alpine', tableClass, classNameContainer)}>
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
        domLayout='autoHeight'
        onGridReady={onGridReady}
        rowData={rowData}
        columnDefs={colDefs}
        onFirstDataRendered={onFirstDataRendered}
        loadingOverlayComponent='LoadingOverlay'
        {...tableProps}
      />
    </div>
  );
};
