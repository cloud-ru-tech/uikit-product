import { ColumnCheckboxRenderer, HeaderCheckboxRenderer, RadioColumnRenderer } from '../components/renderers';
import { ColumnDefinition } from './types';

export const tableHeaderHeight = 28;
export const tableRowHeight = 44;

export function TableCheckboxColumnDefinition(itemCount: number): ColumnDefinition {
  return {
    width: 44,
    minWidth: 44,
    maxWidth: 44,
    sortable: false,
    suppressMenu: true,
    resizable: true,
    unSortIcon: false,
    colId: 'checked',
    headerComponent: HeaderCheckboxRenderer,
    headerComponentParams: () => ({ itemCount }),
    cellRenderer: ColumnCheckboxRenderer,
    customMeta: {
      skipOnExport: true,
    },
  };
}

export const TableRadioColumnDefinition: ColumnDefinition = {
  width: 44,
  minWidth: 44,
  maxWidth: 44,
  sortable: false,
  suppressMenu: true,
  unSortIcon: false,
  colId: 'radio',
  cellRenderer: RadioColumnRenderer,
  customMeta: {
    skipOnExport: true,
  },
};
