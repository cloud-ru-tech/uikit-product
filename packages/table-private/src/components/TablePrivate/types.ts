import { Module } from '@ag-grid-community/core';
import { AgGridReactProps } from '@ag-grid-community/react';

import { ColumnDefinition } from '../../helpers/types';

export type TablePrivateProps = AgGridReactProps & {
  className?: string;
  checkboxSelection?: boolean;
  doesRowPassFilter?(data: any): boolean;
  additionModules?: Module[];
  columnDefs: ColumnDefinition[];
  rowData: NonNullable<AgGridReactProps['rowData']>;
};
