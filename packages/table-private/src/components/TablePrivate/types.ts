import { Module, RowClickedEvent, RowDoubleClickedEvent } from '@ag-grid-community/core';
import { AgGridReactProps } from '@ag-grid-community/react';

import { ColumnDefinition } from '../../helpers/types';

export type TablePrivateProps = AgGridReactProps & {
  className?: string;
  checkboxSelection?: boolean;
  doesRowPassFilter?(data: any): boolean;
  additionModules?: Module[];
  onRowClicked?(e: RowClickedEvent): void;
  onRowDoubleClicked?(e: RowDoubleClickedEvent): void;
  columnDefs: ColumnDefinition[];
  rowData: NonNullable<AgGridReactProps['rowData']>;
};
