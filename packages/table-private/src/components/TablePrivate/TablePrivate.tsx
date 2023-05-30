import '@ag-grid-community/styles/ag-grid.min.css';
import '@ag-grid-community/styles/ag-theme-alpine.min.css';

import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  ColumnResizedEvent,
  Events,
  FilterChangedEvent,
  GridApi,
  GridReadyEvent,
  GridSizeChangedEvent,
} from '@ag-grid-community/core';
import { AgGridReact } from '@ag-grid-community/react';
import { cx } from '@linaria/core';
import debounce from 'lodash.debounce';
import { useEffect, useState } from 'react';

import {
  TableCheckboxColumnDefinition,
  tableHeaderHeight,
  TableRadioColumnDefinition,
  tableRowHeight,
} from '../../helpers/constants';
import { styledTable } from '../../helpers/styled';
import { ColumnDefinition } from '../../helpers/types';
import { NoDataReasons, NoRows } from '../overlays';
import * as S from './styled';
import { SelectionMode, TablePrivateProps } from './types';

const AgGridModules = [ClientSideRowModelModule];

function StylelessTablePrivate({
  rowData = [],
  pinnedTopRowData,
  columnDefs = [],
  gridOptions = {},
  selectionMode,
  selectedRows,
  doesRowPassFilter,
  className,
  onGridReady,
  additionModules = [],
  isSearching,
  ...tableProps
}: TablePrivateProps) {
  const [gridApi, setGridApi] = useState<GridApi>();
  const [displayedRowsCount, setDisplayedRowsCount] = useState<number | undefined>(rowData.length);
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

    gridApi.addEventListener(Events.EVENT_COLUMN_RESIZED, onColumnResizedHandler);

    return () => gridApi.removeEventListener(Events.EVENT_COLUMN_RESIZED, onColumnResizedHandler);
  }, [gridApi, resizedColumns]);

  useEffect(() => {
    if (!gridApi) return;

    const onModelUpdatedHandler = () => setDisplayedRowsCount(gridApi.getDisplayedRowCount());

    gridApi.addEventListener(Events.EVENT_MODEL_UPDATED, onModelUpdatedHandler);

    onModelUpdatedHandler();

    return () => gridApi.removeEventListener(Events.EVENT_MODEL_UPDATED, onModelUpdatedHandler);
  }, [gridApi]);

  const colDefs = () => {
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

    if (selectionMode !== SelectionMode.None) {
      if (selectionMode === SelectionMode.Single) return [{ ...TableRadioColumnDefinition }, ...colDefs];

      return [{ ...TableCheckboxColumnDefinition(rowData.length) }, ...colDefs];
    }

    return [...colDefs];
  };

  useEffect(() => {
    if (gridApi && Object.keys(resizedColumns).length) {
      gridApi.sizeColumnsToFit();
    }
  }, [gridApi, resizedColumns]);

  const onFilterChanged = (params: FilterChangedEvent) => {
    gridOptions?.onFilterChanged?.(params);
  };

  const hasOnlyPinnedData = Boolean(pinnedTopRowData?.length && (rowData?.length === 0 || !displayedRowsCount));
  const [showOverlay, setShowOverlay] = useState(!Boolean(displayedRowsCount || pinnedTopRowData?.length));

  useEffect(() => {
    const newValue = !Boolean(displayedRowsCount || pinnedTopRowData?.length);
    if (showOverlay !== newValue) {
      setShowOverlay(newValue);
    }
  }, [displayedRowsCount, gridApi, showOverlay, pinnedTopRowData?.length]);

  useEffect(() => {
    setTimeout(() => {
      if (showOverlay) {
        gridApi?.showNoRowsOverlay();
      } else {
        gridApi?.hideOverlay();
      }
    });
  }, [gridApi, rowData, showOverlay]);

  useEffect(() => {
    if (!gridApi || selectionMode === SelectionMode.None) return;
    setTimeout(() => {
      const nodes = gridApi.getRenderedNodes();

      const selectedNodes = nodes.filter(node => node.id && selectedRows?.includes(node.id));
      if (!selectedNodes.length) return;
      selectedNodes.forEach(node => node.setSelected(true));
    });
  }, [gridApi, selectedRows, selectionMode]);

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
          isRowSelectable: ({ data }: any) => !Boolean(data?.disabled),
          suppressRowClickSelection: selectionMode !== SelectionMode.Single,
          suppressCellFocus: true,
          rowSelection: selectionMode !== SelectionMode.None ? selectionMode : undefined,
          headerHeight: tableHeaderHeight,
          rowHeight: tableRowHeight,
          rowMultiSelectWithClick: selectionMode === SelectionMode.Multiple,
          suppressRowDeselection: selectionMode === SelectionMode.Single,
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
        columnDefs={colDefs()}
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

export { SelectionMode };
export const TablePrivate = S.styledTablePrivate(styledTable(StylelessTablePrivate));
