import { OptionTypeBase, SelectProps } from '@sbercloud/uikit-product-select';

import { FilterValue, TFilterOption, TFilterOptionType } from './types';

export const getDefaultValue = (data: TFilterOption['sourceData'], type: TFilterOptionType): FilterValue => {
  if (type === TFilterOptionType.Datepicker) {
    return data?.[0]?.value || new Date();
  }

  if (data) {
    return data[0]?.value || data[0]?.options?.[0]?.value;
  }

  return '';
};

export const findSelectValue = (data: SelectProps['value'], value: string[]): OptionTypeBase[] => {
  const collapseGroup = data.reduce((acc: OptionTypeBase[], option: OptionTypeBase) => {
    const isCollapsed = Boolean(option.options);
    if (isCollapsed) return [...acc, ...option.options];
    return [...acc, option];
  }, []);

  return value.map(id => collapseGroup.find((option: OptionTypeBase) => option.value === id));
};
