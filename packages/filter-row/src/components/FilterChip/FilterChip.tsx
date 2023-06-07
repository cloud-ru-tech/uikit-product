import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

import { FilterChipRadio, FilterChipSelect } from './components';
import { FilterChipDate } from './components/FilterChipDate/FilterChipDate';
import { ComponentProps, FilterChipProps, FilterChipType } from './types';

const FILTER_COMPONENTS = {
  [FilterChipType.Select]: FilterChipSelect,
  [FilterChipType.Radio]: FilterChipRadio,
  [FilterChipType.Date]: FilterChipDate,
};

export const ForwardedFilterChip = forwardRef(({ type, ...props }: FilterChipProps, ref) => {
  const Component = FILTER_COMPONENTS[type] as ForwardRefExoticComponent<
    ComponentProps<typeof type> & RefAttributes<unknown>
  >;

  return <Component {...props} ref={ref} />;
});

export const FilterChip = ForwardedFilterChip as typeof ForwardedFilterChip & {
  types: typeof FilterChipType;
};

FilterChip.types = FilterChipType;

export type { FilterChipProps };
