import { AgGridReactProps } from '@ag-grid-community/react';

export type TableFreePrivateProps = AgGridReactProps & {
  className?: string;
  checkboxSelection?: boolean;
  columnDefs: NonNullable<AgGridReactProps['columnDefs']>;
  rowData: NonNullable<AgGridReactProps['rowData']>;
  noRowsText?: string;
  pageSize?: number;
};
