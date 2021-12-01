import { ColDef as AgColDef, ColGroupDef as AgColGroupDef } from '@ag-grid-community/core';

type ColWithId = {
  colId: string;
  field?: string;
};

type ColWithField = {
  field: string;
  colId?: string;
};

type ColDef = AgColDef & (ColWithField | ColWithId);

type ColGroupDef = AgColGroupDef & (ColWithField | ColWithId);

type ColumnDef<T extends ColDef | ColGroupDef> = T extends ColGroupDef ? ColGroupDef : ColDef;

export type ColumnDefinition = NonNullable<ColumnDef<ColGroupDef | ColDef>> & {
  customMeta?: { skipOnExport?: boolean };
};
