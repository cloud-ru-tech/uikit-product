import { ReactNode } from 'react';

export enum FilterChipType {
  Select = 'Select',
  Radio = 'Radio',
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

type SelectFilterType = {
  type: FilterChipType.Select;
} & SelectChipProps;

type RadioFilterType = {
  type: FilterChipType.Radio;
} & RadioChipProps;

export type FilterChipProps = {
  id: string;
} & (SelectFilterType | RadioFilterType);

export type ComponentProps<T extends FilterChipType.Select | FilterChipType.Radio> = T extends FilterChipType.Select
  ? SelectChipProps
  : RadioChipProps;
