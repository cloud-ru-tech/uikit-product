import '@ag-grid-community/core/dist/styles/ag-grid.min.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.min.css';

import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { AgGridReact, AgGridReactProps } from '@ag-grid-community/react';
import { cx } from '@linaria/core';
import { useCallback, useMemo } from 'react';

import { useLanguage } from '@sbercloud/uikit-utils';

import { TableCheckboxColumnDefinition, tableHeaderHeight, tableRowHeight } from '../../helpers/constants';
import { freeTableMinHeight, tableClass } from '../../helpers/tableClass';
import { Texts, textProvider } from '../../helpers/texts-provider';

const AgGridModules = [ClientSideRowModelModule];

export interface TableFreePrivateProps extends AgGridReactProps {
  className?: string;
  checkboxSelection?: boolean;
  columnDefs: NonNullable<AgGridReactProps['columnDefs']>;
  rowData: NonNullable<AgGridReactProps['rowData']>;
}

export function TableFreePrivate({
  rowData = [],
  columnDefs = [],
  gridOptions = {},
  onGridReady,
  checkboxSelection = false,
  className,
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
      <div className={cx('ag-theme-alpine', tableClass, freeTableMinHeight, className)}>
        <AgGridReact
          modules={AgGridModules}
          gridOptions={{
            suppressCellSelection: true,
            headerHeight: tableHeaderHeight,
            rowHeight: tableRowHeight,
            rowSelection: 'multiple',
            suppressRowClickSelection: true,
            pagination: true,
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
          overlayNoRowsTemplate={textProvider(languageCode, Texts.NoRowsInitially)}
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
