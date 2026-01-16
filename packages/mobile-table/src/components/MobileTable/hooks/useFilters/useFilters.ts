import { useMemo, useState } from 'react';

import { FiltersState } from '@sbercloud/uikit-product-mobile-chips';
import { useValueControl } from '@snack-uikit/utils';

import { MobileTableProps } from '../../types';
import { getInitialColumnsFiltersOpenValue } from './utils';

type useFiltersProps<TData extends object, TFilters extends FiltersState = Record<string, unknown>> = Pick<
  MobileTableProps<TData, TFilters>,
  'columnFilters'
>;

export function useFilters<TData extends object, TFilters extends FiltersState = Record<string, unknown>>({
  columnFilters,
}: useFiltersProps<TData, TFilters>) {
  const [areColumnFiltersOpen, setAreColumnFiltersOpen] = useState<boolean>(() =>
    getInitialColumnsFiltersOpenValue(columnFilters),
  );

  const [filter, setFilter] = useValueControl<TFilters | undefined>({
    value: columnFilters?.value,
    defaultValue: columnFilters?.defaultValue as TFilters,
    onChange: columnFilters?.onChange,
  });

  const [filterVisibility = [], setFilterVisibility] = useValueControl<string[]>({
    value: columnFilters?.visibleFilters,
    defaultValue: [],
    onChange: columnFilters?.onVisibleFiltersChange,
  });

  const patchedFilter = useMemo(() => {
    if (!columnFilters) {
      return undefined;
    }

    return {
      open: areColumnFiltersOpen,
      onOpenChange: setAreColumnFiltersOpen,
      ...columnFilters,
      value: filter,
      onChange: setFilter as (filter: TFilters) => void,
      visibleFilters: filterVisibility,
      onVisibleFiltersChange: setFilterVisibility,
    };
  }, [columnFilters, areColumnFiltersOpen, filter, setFilter, filterVisibility, setFilterVisibility]);

  return {
    filter,
    setFilter,

    patchedFilter,

    setFilterVisibility,
  };
}
