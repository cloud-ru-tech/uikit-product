import { useMemo, useState, useEffect } from 'react';
import { cx } from '@linaria/core';

import { AgGridReact, AgGridReactProps } from '@ag-grid-community/react';
import { ModuleRegistry } from '@ag-grid-community/core';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import debounce from 'lodash.debounce';

import {
  tableHeaderHeight,
  tableRowHeight,
  TableCheckboxColumnDefinition,
} from 'components/Table/helpers/constants';
import { TableBasicTypes } from 'components/Table/helpers/types';
import { tableClass } from 'components/Table/styles/tableClass';

import 'ag-grid-enterprise/dist/styles/ag-grid.min.css';
import 'ag-grid-enterprise/dist/styles/ag-theme-alpine.min.css';

ModuleRegistry.registerModules(AllModules);

export interface ITableProps extends AgGridReactProps {
  classNameContainer?: string;
  checkboxSelection?: boolean;
}

export const Table: React.FC<ITableProps> = ({
  rowData = [],
  columnDefs = [],
  gridOptions = {},
  checkboxSelection = false,
  classNameContainer,
  onGridReady,
  ...tableProps
}) => {
  const [gridApi, setGridApi] = useState<TableBasicTypes.GridApi>();

  const handleGridReady = (params: TableBasicTypes.GridReadyEvent) => {
    params.api.sizeColumnsToFit();
    setGridApi(params.api);
    onGridReady?.(params);
  };

  useEffect(() => {
    const resize = debounce(() => {
      gridApi?.sizeColumnsToFit();
    }, 300);
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [gridApi]);

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
          suppressContextMenu: true,
          defaultColDef: {
            resizable: true,
            sortable: true,
            unSortIcon: true,
            suppressMenu: true,
          },
          ...gridOptions,
        }}
        domLayout='autoHeight'
        onGridReady={handleGridReady}
        rowData={rowData}
        columnDefs={colDefs}
        // onFirstDataRendered={onFirstDataRendered}
        loadingOverlayComponent='LoadingOverlay'
        {...tableProps}
      />
    </div>
  );
};
