import { useCallback, useMemo } from 'react';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import clsx from 'clsx';

import { tableClass } from '../styles/tableClass';

import 'ag-grid-community/dist/styles/ag-grid.min.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.min.css';

const tableHeaderHeight = 28;
const tableRowHeight = 44;
const tableHeaderMinColumnWidth = 44;

const TableCheckboxColumnDefine = {
  width: tableHeaderMinColumnWidth,
  checkboxSelection: true,
  headerCheckboxSelection: true,
  headerCheckboxSelectionFilteredOnly: true,
  unSortIcon: false,
  headerClass: 'ag-header-checkbox-selection-cell',
  colId: 'checked',
};

export interface ITableFreeProp extends AgGridReactProps {
  classNameContainer?: string;
  checkboxSelection?: boolean;
}

export const TableFree: React.FC<ITableFreeProp> = ({
  rowData = [],
  columnDefs = [],
  gridOptions = {},
  onGridReady,
  // frameworkComponents,
  checkboxSelection = false,
  classNameContainer,
  ...tableProps
}) => {
  const onFirstDataRendered = useCallback(params => {
    params.api.sizeColumnsToFit();
  }, []);

  const colDefs = useMemo(() => {
    if (checkboxSelection) {
      return [{ ...TableCheckboxColumnDefine }, ...columnDefs];
    }

    return [...columnDefs];
  }, [checkboxSelection, columnDefs]);

  // const frameworkComponentsMemo = useMemo(() => {
  //   const resFramework: { [key: string]: React.ReactNode } = {};
  //   columnDefs.forEach(colSettings => {
  //     const cellRenderer: string = colSettings?.cellRenderer;
  //     if (cellRenderer) {
  //       try {
  //         resFramework[cellRenderer] = FrameworkComponents[cellRenderer];
  //       } catch (error) {}
  //     }
  //   });
  //   return { ...resFramework, ...frameworkComponents };
  // }, [columnDefs]);

  return (
    <div className={clsx('ag-theme-alpine', tableClass, classNameContainer)}>
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
        domLayout={'autoHeight'}
        onGridReady={onGridReady}
        rowData={rowData}
        columnDefs={colDefs}
        onFirstDataRendered={onFirstDataRendered}
        // frameworkComponents={frameworkComponentsMemo}
        loadingOverlayComponent='LoadingOverlay'
        {...tableProps}
      />
    </div>
  );
};
