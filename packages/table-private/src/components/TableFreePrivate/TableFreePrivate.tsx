import '@ag-grid-community/core/dist/styles/ag-grid.min.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.min.css';

import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { GridReadyEvent, GridSizeChangedEvent } from '@ag-grid-community/core';
import { AgGridReact } from '@ag-grid-community/react';
import { cx } from '@linaria/core';
import { useMemo } from 'react';

import { useLanguage } from '@sbercloud/uikit-product-utils';

import { TableCheckboxColumnDefinition, tableHeaderHeight, tableRowHeight } from '../../helpers/constants';
import { styledTable } from '../../helpers/styled';
import { textProvider, Texts } from '../../helpers/texts-provider';
import { styledTableFreePrivate } from './styled';
import { TableFreePrivateProps } from './types';

const AgGridModules = [ClientSideRowModelModule];

function StylelessTableFreePrivate({
  rowData = [],
  columnDefs = [],
  gridOptions = {},
  onGridReady,
  checkboxSelection = false,
  className,
  noRowsText,
  pageSize,
  domLayout = 'autoHeight',
  ...tableProps
}: TableFreePrivateProps) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  const handleGridReady = (params: GridReadyEvent) => {
    onGridReady?.(params);
    params.api.sizeColumnsToFit();
  };

  const handleGridSizeChanged = (params: GridSizeChangedEvent) => {
    params.api.sizeColumnsToFit();
  };

  const colDefs = useMemo(() => {
    if (checkboxSelection) {
      return [{ ...TableCheckboxColumnDefinition }, ...columnDefs];
    }

    return [...columnDefs];
  }, [checkboxSelection, columnDefs]);

  return (
    <>
      <div className={cx('ag-theme-alpine', className)}>
        <AgGridReact
          modules={AgGridModules}
          gridOptions={{
            suppressCellFocus: true,
            headerHeight: tableHeaderHeight,
            rowHeight: tableRowHeight,
            rowSelection: 'multiple',
            suppressRowClickSelection: true,
            pagination: Boolean(pageSize),
            paginationPageSize: pageSize,
            ensureDomOrder: true,
            suppressMovableColumns: true,
            defaultColDef: {
              flex: 1,
              resizable: true,
              sortable: true,
              unSortIcon: true,
            },
            ...gridOptions,
          }}
          columnDefs={colDefs}
          domLayout={domLayout}
          enableCellTextSelection
          localeText={{ noRowsToShow: noRowsText || textProvider(languageCode, Texts.NoRowsInitially) }}
          onGridReady={handleGridReady}
          onGridSizeChanged={handleGridSizeChanged}
          rowData={rowData}
          sortingOrder={['desc', 'asc', null]}
          suppressPaginationPanel
          {...tableProps}
        />
      </div>
    </>
  );
}

export type { TableFreePrivateProps };

export const TableFreePrivate = styledTableFreePrivate(styledTable(StylelessTableFreePrivate));
