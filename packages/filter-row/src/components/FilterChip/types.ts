import { ReactNode } from 'react';

import { InnerDate } from '../FilterDatePicker/helpers/types';

export enum FilterChipType {
  Select = 'Select',
  Radio = 'Radio',
  Date = 'Date',
}

type FilterLabelRequired = {
  label: string;
  icon?: ReactNode;
};

type FilterIconRequired = {
  label?: string;
  icon: ReactNode;
};

export type ChipFilterLabelValue = FilterLabelRequired | FilterIconRequired;

type SelectChipItem = {
  value: string;
  label: ReactNode;
  valueToFilter?: string;
  checked?: boolean;
  header?: string;
};

export type SelectChipProps = {
  items: SelectChipItem[];
  onChange(valuesIds: string[]): void;
  withSelectAll?: boolean;
  withSearch?: boolean;
  withSingleFilterClearButton?: boolean;
} & ChipFilterLabelValue;

export type RadioChipProps = {
  items: Array<{
    value: string | boolean;
    label: ReactNode;
    valueToFilter?: string;
  }>;
  onChange(value: string | boolean | null): void;
  withSearch?: boolean;
  withSingleFilterClearButton?: boolean;
} & ChipFilterLabelValue;

export type DateChipProps = {
  onChange(dates: [InnerDate, InnerDate?]): void;
  withSingleFilterClearButton?: boolean;
} & ChipFilterLabelValue;

type SelectFilterType = {
  type: FilterChipType.Select;
} & SelectChipProps;

type RadioFilterType = {
  type: FilterChipType.Radio;
} & RadioChipProps;

type DateFilterType = {
  type: FilterChipType.Date;
} & DateChipProps;

export type FilterChipProps = {
  id: string;
} & (SelectFilterType | RadioFilterType | DateFilterType);

export type ComponentProps<T extends FilterChipType.Select | FilterChipType.Radio | FilterChipType.Date> =
  T extends FilterChipType.Select ? SelectChipProps : T extends FilterChipType.Date ? DateChipProps : RadioChipProps;
