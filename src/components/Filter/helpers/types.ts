import { OptionTypeBase } from 'components/Select';

import { LogicConditionType } from '../helpers/logicOptions';

export type TFilterValueType = {
  id: string;
  value: string[];
  condition: LogicConditionType;
  includeConditions?: LogicConditionType[];
};

export interface IFilterProps {
  filterOptions?: OptionTypeBase[];
  filterPropOptions?: Record<string, OptionTypeBase[]>;
  className?: string;

  value: TFilterValueType[] | string;
  onChange?: (value: TFilterValueType[], queryString: string) => void;
  children?: (props: {
    badgeText: string;
    open?: boolean;
  }) => JSX.Element | JSX.Element;
}

export interface IFilterRowProps extends Partial<IFilterProps> {
  index?: number;
  noFilteredProps?: OptionTypeBase[];
  propValue?: TFilterValueType;
  value: TFilterValueType[];
  onChange?: (value: TFilterValueType[]) => void;
}
