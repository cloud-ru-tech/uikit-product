import { ColDef, ColGroupDef } from '@ag-grid-community/core';

export type ColumnDefinition = NonNullable<ColDef | ColGroupDef> & { customMeta?: { skipOnExport?: boolean } };
