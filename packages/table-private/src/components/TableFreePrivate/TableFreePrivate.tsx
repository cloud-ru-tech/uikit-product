import '@ag-grid-community/core/dist/styles/ag-grid.min.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.min.css';

import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { AgGridReact } from '@ag-grid-community/react';
import { cx } from '@linaria/core';
import { useCallback, useMemo } from 'react';

import { useLanguage } from '@sbercloud/uikit-utils';

import { TableCheckboxColumnDefinition, tableHeaderHeight, tableRowHeight } from '../../helpers/constants';
import { styledTable } from '../../helpers/styled';
import { Texts, textProvider } from '../../helpers/texts-provider';
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
  ...tableProps
}: TableFreePrivateProps) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
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
      <div className={cx('ag-theme-alpine', className)}>
        <AgGridReact
          modules={AgGridModules}
          gridOptions={{
            suppressCellSelection: true,
            headerHeight: tableHeaderHeight,
            rowHeight: tableRowHeight,
            rowSelection: 'multiple',
            suppressRowClickSelection: true,
            pagination: !!pageSize,
            paginationPageSize: pageSize,
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
          localeText={{ noRowsToShow: noRowsText || textProvider(languageCode, Texts.NoRowsInitially) }}
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

export type { TableFreePrivateProps };

export const TableFreePrivate = styledTableFreePrivate(styledTable(StylelessTableFreePrivate));
