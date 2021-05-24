import { ISelectProps, OptionTypeBase } from 'components/Select';

export const getFirstValueFromSelect = (
  data: ISelectProps<OptionTypeBase>['value'],
): string => data[0]?.value || data[0]?.options?.[0]?.value;

export const findSelectValue = (
  data: ISelectProps<OptionTypeBase>['value'],
  value: string[],
): OptionTypeBase[] => {
  const collapseGroup = data.reduce(
    (acc: OptionTypeBase[], option: OptionTypeBase) => {
      const isCollapsed = Boolean(option.options);
      if (isCollapsed) return [...acc, ...option.options];
      return [...acc, option];
    },
    [],
  );

  const selectVal = value.map(id =>
    collapseGroup.find((option: OptionTypeBase) => option.value === id),
  );

  return selectVal;
};
