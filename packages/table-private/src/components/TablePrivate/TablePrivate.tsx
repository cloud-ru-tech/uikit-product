import '@ag-grid-community/core/dist/styles/ag-grid.min.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.min.css';

import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  ColumnResizedEvent,
  FilterChangedEvent,
  GridApi,
  GridReadyEvent,
  GridSizeChangedEvent,
} from '@ag-grid-community/core';
import { AgGridReact } from '@ag-grid-community/react';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
import { cx } from '@linaria/core';
import debounce from 'lodash.debounce';
import { useEffect, useMemo, useState } from 'react';

import { TableCheckboxColumnDefinition, tableHeaderHeight, tableRowHeight } from '../../helpers/constants';
import { styledTable } from '../../helpers/styled';
import { ColumnDefinition } from '../../helpers/types';
import { NoDataReasons, NoRows } from '../overlays';
import * as S from './styled';
import { TablePrivateProps } from './types';

const AgGridModules = [ClientSideRowModelModule, RangeSelectionModule];

function StylelessTablePrivate({
  rowData = [],
  pinnedTopRowData,
  columnDefs = [],
  gridOptions = {},
  checkboxSelection = false,
  doesRowPassFilter,
  className,
  onGridReady,
  additionModules = [],
  isSearching,
  ...tableProps
}: TablePrivateProps) {
  const [gridApi, setGridApi] = useState<GridApi>();
  const [resizedColumns, setResizedColumns] = useState<{ [key: string]: string }>({});

  const handleGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
    onGridReady?.(params);
    params.api.sizeColumnsToFit();
  };

  const handleGridSizeChanged = (params: GridSizeChangedEvent) => {
    params.api.sizeColumnsToFit();
  };

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
    if (gridApi && Object.keys(resizedColumns).length) {
      gridApi.sizeColumnsToFit();
    }
  }, [gridApi, resizedColumns]);

  const onFilterChanged = (params: FilterChangedEvent) => {
    gridOptions?.onFilterChanged?.(params);
  };

  const hasOnlyPinnedData = Boolean(
    pinnedTopRowData?.length && (rowData?.length === 0 || !gridApi?.getDisplayedRowCount()),
  );

  const showOverlay = !Boolean(gridApi?.getDisplayedRowCount() || pinnedTopRowData?.length);

  return (
    <div
      className={cx(
        'ag-theme-alpine',
        showOverlay && S.showTableOverlayClassName,
        hasOnlyPinnedData && S.hideNoRowsOverlayClassName,
        className,
      )}
    >
      <AgGridReact
        modules={[...AgGridModules, ...additionModules]}
        gridOptions={{
          suppressCellFocus: true,
          headerHeight: tableHeaderHeight,
          rowHeight: tableRowHeight,
          rowSelection: 'multiple',
          suppressRowClickSelection: true,
          suppressContextMenu: true,
          enableCellTextSelection: true,
          ensureDomOrder: true,
          suppressMovableColumns: true,
          defaultColDef: {
            resizable: true,
            sortable: true,
            unSortIcon: true,
            suppressMenu: true,
          },
          ...gridOptions,
          onFilterChanged,
        }}
        domLayout='autoHeight'
        onGridReady={handleGridReady}
        onGridSizeChanged={handleGridSizeChanged}
        rowData={rowData}
        pinnedTopRowData={pinnedTopRowData}
        columnDefs={colDefs}
        isExternalFilterPresent={() => Boolean(doesRowPassFilter)}
        doesExternalFilterPass={node => doesRowPassFilter?.(node.data) || false}
        noRowsOverlayComponent={NoRows}
        noRowsOverlayComponentParams={{
          reason: rowData.length === 0 && !isSearching ? NoDataReasons.InitialEmpty : NoDataReasons.Search,
        }}
        {...tableProps}
      />
    </div>
  );
}

export type { TablePrivateProps };

export const TablePrivate = S.styledTablePrivate(styledTable(StylelessTablePrivate));
