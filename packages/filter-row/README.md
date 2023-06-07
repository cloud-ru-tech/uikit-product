# Filter Row

## Installation
`npm i @sbercloud/uikit-product-filter-row`

[Changelog](./CHANGELOG.md)

Блок фильтров в строку, которые в основном будут использоваться в таблицах

## Props
```typescript
type FilterRowProps = {
  filters: RemoveKey<FilterChipProps, 'onChange'>[];
  onChange(filters: FiltersState): void;
  className?: string;
  withSingleFilterClearButton?: boolean;
};

type FiltersState = { [id: string]: FilterValue };

type FilterValue = string | boolean | [InnerDate, InnerDate?] | string[] | null

type FilterChipProps = {
  id: string;
} & (SelectFilterType | RadioFilterType | DateFilterType);

enum FilterChipType {
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

type ChipFilterLabelValue = FilterLabelRequired | FilterIconRequired;

type SelectChipItem = {
  value: string;
  label: ReactNode;
  valueToFilter?: string;
  checked?: boolean;
  header?: string;
};

type SelectChipProps = {
  items: SelectChipItem[];
  onChange(valuesIds: string[]): void;
  withSelectAll?: boolean;
  withSearch?: boolean;
  withSingleFilterClearButton?: boolean;
} & ChipFilterLabelValue;

type RadioChipProps = {
  items: Array<{
    value: string | boolean;
    label: ReactNode;
    valueToFilter?: string;
  }>;
  onChange(value: string | boolean | null): void;
  withSearch?: boolean;
  withSingleFilterClearButton?: boolean;
} & ChipFilterLabelValue;

type InnerDate = Date | undefined;

type DateChipProps = {
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

```

