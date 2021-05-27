import 'ag-grid-enterprise/dist/styles/ag-grid.min.css';
import 'ag-grid-enterprise/dist/styles/ag-theme-alpine.min.css';

import { AgGridReact, AgGridReactProps } from '@ag-grid-community/react';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import { cx } from '@linaria/core';
import debounce from 'lodash.debounce';
import { useEffect, useMemo, useState } from 'react';

import { TableCheckboxColumnDefinition, tableHeaderHeight, tableRowHeight } from '../../helpers/constants';
import { TableBasicTypes } from '../../helpers/types';
import { tableClass } from '../../styles/tableClass';

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
        modules={AllModules}
        gridOptions={{
          suppressCellSelection: true,
          headerHeight: tableHeaderHeight,
          rowHeight: tableRowHeight,
          rowSelection: 'multiple',
          suppressRowClickSelection: true,
          suppressContextMenu: true,
          enableCellTextSelection: true,
          defaultColDef: {
            resizable: true,
            sortable: true,
            unSortIcon: true,
            suppressMenu: true,
            cellStyle: {
              textOverflow: 'ellipsis',
              display: 'block',
            },
          },
          ...gridOptions,
        }}
        domLayout='autoHeight'
        onGridReady={handleGridReady}
        rowData={rowData}
        columnDefs={colDefs}
        loadingOverlayComponent='LoadingOverlay'
        {...tableProps}
      />
    </div>
  );
};
