import { MobileTableProps } from '../../../types';

export function getInitialColumnsFiltersOpenValue<TData extends object>(
  columnFilters: MobileTableProps<TData>['columnFilters'],
) {
  if (!columnFilters) {
    return false;
  }

  return 'initialOpen' in columnFilters && typeof columnFilters.initialOpen === 'boolean'
    ? columnFilters.initialOpen
    : true;
}
