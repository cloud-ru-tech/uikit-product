import '@ag-grid-community/core/dist/styles/ag-grid.min.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.min.css';

import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { GridApi, GridReadyEvent } from '@ag-grid-community/core';
import { AgGridReact, AgGridReactProps } from '@ag-grid-community/react';
import { MasterDetailModule } from '@ag-grid-enterprise/master-detail';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
import { cx } from '@linaria/core';
import debounce from 'lodash.debounce';
import { useEffect, useMemo, useState } from 'react';

import { TableCheckboxColumnDefinition, tableHeaderHeight, tableRowHeight } from '../../helpers/constants';
import { tableClass } from '../../helpers/tableClass';
import { NoRows } from '../overlays';
import { NoDataReasons } from '../overlays/NoRows/types';

export interface TablePrivateProps extends AgGridReactProps {
  className?: string;
  checkboxSelection?: boolean;
  doesRowPassFilter?(data: any): boolean;
  columnDefs: NonNullable<AgGridReactProps['columnDefs']>;
  rowData: NonNullable<AgGridReactProps['rowData']>;
}

const AgGridModules = [ClientSideRowModelModule, RangeSelectionModule, MasterDetailModule];

export function TablePrivate({
  rowData = [],
  columnDefs = [],
  gridOptions = {},
  checkboxSelection = false,
  doesRowPassFilter,
  className,
  onGridReady,
  ...tableProps
}: TablePrivateProps) {
  const [gridApi, setGridApi] = useState<GridApi>();

  const handleGridReady = (params: GridReadyEvent) => {
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
    <div className={cx('ag-theme-alpine', tableClass, className)}>
      <AgGridReact
        modules={AgGridModules}
        gridOptions={{
          suppressCellSelection: true,
          headerHeight: tableHeaderHeight,
          rowHeight: tableRowHeight,
          rowSelection: 'multiple',
          suppressRowClickSelection: true,
          suppressContextMenu: true,
          enableCellTextSelection: true,
          ensureDomOrder: true,
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
        isExternalFilterPresent={() => Boolean(doesRowPassFilter)}
        doesExternalFilterPass={node => doesRowPassFilter?.(node.data) || false}
        noRowsOverlayComponentFramework={NoRows}
        noRowsOverlayComponentParams={{
          reason: rowData.length === 0 ? NoDataReasons.InitialEmpty : NoDataReasons.Search,
        }}
        {...tableProps}
      />
    </div>
  );
}
