import { FiltersState } from '@snack-uikit/chips';
import { PersistedFilterState } from '@snack-uikit/toolbar';

import { MobileTableProps } from '../../types';
import { validateFilter, validatePaging, validateSorting } from './validators';

export const getPersistedStateValidator =
  <TData extends object, TFilters extends FiltersState = Record<string, unknown>>(
    columnFilters: MobileTableProps<TData, TFilters>['columnFilters'],
  ) =>
  (data: unknown): data is PersistedFilterState<TFilters> => {
    const dataAsSettings = data as PersistedFilterState<TFilters>;
    const isPaginationValid = validatePaging(dataAsSettings?.pagination);
    const isSortingValid = validateSorting(dataAsSettings?.ordering);
    const isSearchValid = !dataAsSettings?.search || typeof dataAsSettings?.search === 'string';
    const isFilterValid = Boolean(
      columnFilters?.filters && validateFilter(dataAsSettings.filter, columnFilters.filters),
    );

    return isPaginationValid && isSortingValid && isSearchValid && isFilterValid;
  };
