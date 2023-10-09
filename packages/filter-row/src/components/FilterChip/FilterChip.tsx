import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

import { FilterChipDate, FilterChipNumber, FilterChipRadio, FilterChipSelect, FilterChipString } from './components';
import { FilterChipProps, FilterChipType } from './types';

const FILTER_COMPONENTS = {
  [FilterChipType.Select]: FilterChipSelect,
  [FilterChipType.Radio]: FilterChipRadio,
  [FilterChipType.Date]: FilterChipDate,
  [FilterChipType.Number]: FilterChipNumber,
  [FilterChipType.String]: FilterChipString,
};

export const ForwardedFilterChip = forwardRef((props: FilterChipProps, ref) => {
  const Component = FILTER_COMPONENTS[props.type] as ForwardRefExoticComponent<
    FilterChipProps & RefAttributes<unknown>
  >;

  return <Component {...props} ref={ref} />;
});

export const FilterChip = ForwardedFilterChip as typeof ForwardedFilterChip & {
  types: typeof FilterChipType;
};

FilterChip.types = FilterChipType;

export type { FilterChipProps };
