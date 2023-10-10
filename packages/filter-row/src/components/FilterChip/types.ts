import { ReactNode } from 'react';

import { InnerDate } from '../FilterDatePicker/helpers/types';
import { FilterNumberValue } from '../FilterNumber/helpers/types';
import { FilterStringValue } from '../FilterString/helpers/types';

export enum FilterChipType {
  Select = 'Select',
  Radio = 'Radio',
  Date = 'Date',
  Number = 'Number',
  String = 'String',
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

type RadioChipItem = {
  value: string | boolean;
  label: ReactNode;
  valueToFilter?: string;
  checked?: boolean;
};

export type RadioChipProps = {
  items: Array<RadioChipItem>;
  onChange(value: string | boolean | null): void;
  withSearch?: boolean;
  withSingleFilterClearButton?: boolean;
} & ChipFilterLabelValue;

export type DateChipProps = {
  onChange(dates: [InnerDate, InnerDate?]): void;
  min?: Date;
  max?: Date;
  withSingleFilterClearButton?: boolean;
} & ChipFilterLabelValue;

export type NumberChipProps = {
  onChange(value: FilterNumberValue): void;
  withSingleFilterClearButton?: boolean;
  showRangeChips?: boolean;
} & ChipFilterLabelValue;

export type StringChipProps = {
  onChange(value: FilterStringValue): void;
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

type NumberFilterType = {
  type: FilterChipType.Number;
} & NumberChipProps;

type StringFilterType = {
  type: FilterChipType.String;
} & StringChipProps;

export type FilterChipProps = {
  id: string;
} & (SelectFilterType | RadioFilterType | DateFilterType | NumberFilterType | StringFilterType);
