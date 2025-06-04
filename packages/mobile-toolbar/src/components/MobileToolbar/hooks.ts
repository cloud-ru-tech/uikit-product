import { useMemo } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { FiltersState, hasFilterBeenApplied } from '@sbercloud/uikit-product-mobile-chips';

import { FilterButtonProps } from '../../helperComponents';
import { FilterRow } from './types';

type UseFiltersProps<TState extends FiltersState> = {
  filterRow?: FilterRow<TState>;
};

type UseFiltersReturnType<TState extends FiltersState> = {
  filterButton?: FilterButtonProps;
  filterRow?: FilterRow<TState>;
};

export function useFilters<TState extends FiltersState>({
  filterRow,
}: UseFiltersProps<TState>): UseFiltersReturnType<TState> {
  const [filtersOpen, setFiltersOpen] = useUncontrolledProp<boolean>(
    filterRow?.open,
    filterRow?.initialOpen || false,
    newValue => {
      const result = typeof newValue === 'function' ? newValue(filtersOpen) : newValue;
      filterRow?.onOpenChange?.(result);
    },
  );

  const [value, setValue] = useUncontrolledProp<TState>(
    filterRow?.value,
    (filterRow?.defaultValue ?? {}) as TState,
    newValue => {
      const result = typeof newValue === 'function' ? newValue(value) : newValue;
      filterRow?.onChange?.(result);
    },
  );

  const [visibleFilters, setVisibleFilters] = useUncontrolledProp<string[]>(
    filterRow?.visibleFilters,
    Object.keys(value),
    newState => {
      const result = typeof newState === 'function' ? newState(visibleFilters) : newState;
      filterRow?.onVisibleFiltersChange?.(result);
    },
  );

  const numberOfFilters = useMemo(
    () => Object.keys(value).reduce((result, filterKey) => result + Number(hasFilterBeenApplied(value[filterKey])), 0),
    [value],
  );

  return {
    filterButton: filterRow ? { open: filtersOpen, onOpenChange: setFiltersOpen, numberOfFilters } : undefined,
    filterRow:
      filtersOpen && filterRow
        ? {
            ...filterRow,
            open: undefined,
            onOpenChange: undefined,
            value,
            onChange: setValue,
            visibleFilters,
            onVisibleFiltersChange: setVisibleFilters,
          }
        : undefined,
  };
}
