import '@ag-grid-community/core/dist/styles/ag-grid.min.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.min.css';

import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ColumnResizedEvent, GridApi, GridReadyEvent, Module } from '@ag-grid-community/core';
import { AgGridReact, AgGridReactProps } from '@ag-grid-community/react';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
import { cx } from '@linaria/core';
import debounce from 'lodash.debounce';
import { useEffect, useMemo, useState } from 'react';

import { TableCheckboxColumnDefinition, tableHeaderHeight, tableRowHeight } from '../../helpers/constants';
import { tableClass } from '../../helpers/tableClass';
import { ColumnDefinition } from '../../helpers/types';
import { NoRows } from '../overlays';
import { NoDataReasons } from '../overlays/NoRows/types';
import { paidTableMinHeight } from './styled';

export type TablePrivateProps = AgGridReactProps & {
  className?: string;
  checkboxSelection?: boolean;
  doesRowPassFilter?(data: any): boolean;
  additionModules?: Module[];
  columnDefs: ColumnDefinition[];
  rowData: NonNullable<AgGridReactProps['rowData']>;
};

const AgGridModules = [ClientSideRowModelModule, RangeSelectionModule];

export function TablePrivate({
  rowData = [],
  columnDefs = [],
  gridOptions = {},
  checkboxSelection = false,
  doesRowPassFilter,
  className,
  onGridReady,
  additionModules = [],
  ...tableProps
}: TablePrivateProps) {
  const [gridApi, setGridApi] = useState<GridApi>();
  const [resizedColumns, setResizedColumns] = useState<{ [key: string]: string }>({});

  const handleGridReady = (params: GridReadyEvent) => {
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

  useEffect(() => {
    if (!gridApi) return;

    const onColumnResizedHandler = debounce((ev: ColumnResizedEvent) => {
      const colId = ev.column?.getId();
      colId && setResizedColumns(cols => ({ ...cols, [colId]: colId }));
    }, 200);

    gridApi.addEventListener('columnResized', onColumnResizedHandler);

    return () => gridApi.removeEventListener('columnResized', onColumnResizedHandler);
  }, [gridApi, resizedColumns]);

  const colDefs = useMemo(() => {
    let colDefs: ColumnDefinition[] = columnDefs;

    if (Object.keys(resizedColumns).length) {
      colDefs = colDefs.map(col => {
        const colId = col['colId'] || col['field'];

        return {
          ...col,
          suppressSizeToFit: Boolean(colId && resizedColumns[colId]),
        };
      });
    }

    if (checkboxSelection) {
      return [{ ...TableCheckboxColumnDefinition }, ...colDefs];
    }

    return [...colDefs];
  }, [checkboxSelection, columnDefs, resizedColumns]);

  useEffect(() => {
    if (!gridApi) return;

    const timeout = setTimeout(() => {
      gridApi.sizeColumnsToFit();
    }, 50);

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [gridApi, resizedColumns]);

  return (
    <div className={cx('ag-theme-alpine', tableClass, paidTableMinHeight, className)}>
      <AgGridReact
        modules={[...AgGridModules, ...additionModules]}
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
