import { SettingType } from '@sbercloud/uikit-product-datepicker';
import { OptionTypeBase } from '@sbercloud/uikit-product-select';

import { LogicConditionType, LogicOptionType } from './logicOptions';

export type FilterValue = string | Date;

export type TFilterValueType = {
  id: string;
  value: FilterValue[];
  condition: LogicConditionType | LogicOptionType;
  includeConditions?: LogicConditionType[];
};

export enum TFilterOptionType {
  Select = 'select',
  Input = 'input',
  Datepicker = 'datepicker',
}

export { SettingType as DatepickerType };

export type TFilterOption = {
  type: TFilterOptionType;
  value: string;
  sourceData?: OptionTypeBase[];
  includeConditions: LogicConditionType[];
  datepickerType?: SettingType;
};

export type FilterProps = {
  filterOptions?: TFilterOption[];
  filterPropOptions?: Record<string, TFilterOption[]>;
  className?: string;

  value: TFilterValueType[] | string;
  onChange?: (value: TFilterValueType[], queryString: string) => void;
  children?: (props: { badgeNumber?: number; open?: boolean }) => JSX.Element;
};

export type FilterRowProps = {
  index?: number;
  noFilteredProps?: TFilterOption[];
  propValue?: TFilterValueType;
  value: TFilterValueType[];
  onChange?: (value: TFilterValueType[]) => void;
} & Partial<FilterProps>;
