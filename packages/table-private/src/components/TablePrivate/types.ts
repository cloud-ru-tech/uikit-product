import { Module, RowClickedEvent, RowDoubleClickedEvent, RowSelectedEvent } from '@ag-grid-community/core';
import { AgGridReactProps } from '@ag-grid-community/react';

import { ColumnDefinition } from '../../helpers/types';

export type TablePrivateProps = AgGridReactProps & {
  className?: string;
  checkboxSelection?: boolean;
  doesRowPassFilter?(data: any): boolean;
  additionModules?: Module[];
  onRowClicked?(e: RowClickedEvent): void;
  onRowSelected?(e: RowSelectedEvent): void;
  onRowDoubleClicked?(e: RowDoubleClickedEvent): void;
  getRowId?: AgGridReactProps['getRowId'];
  columnDefs: ColumnDefinition[];
  rowData: NonNullable<AgGridReactProps['rowData']>;
  pinnedTopRowData?: AgGridReactProps['pinnedTopRowData'];
  isSearching?: boolean;
};
