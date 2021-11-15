import { ColumnDefinition } from './types';

export const tableHeaderHeight = 28;
export const tableRowHeight = 44;

export const TableCheckboxColumnDefinition: ColumnDefinition = {
  width: 44,
  minWidth: 44,
  maxWidth: 44,
  sortable: false,
  suppressMenu: true,
  checkboxSelection: true,
  headerCheckboxSelection: true,
  headerCheckboxSelectionFilteredOnly: true,
  unSortIcon: false,
  headerClass: 'ag-header-checkbox-selection-cell',
  colId: 'checked',
  customMeta: {
    skipOnExport: true,
  },
};
