import { TooltipProps } from '@cloud-ru/uikit-product-mobile-tooltip';
import { QuotaDropdownProps } from '@cloud-ru/uikit-product-quota';
import {
  ButtonFilledProps,
  ButtonFunctionProps,
  ButtonOutlineProps,
  ButtonSimpleProps,
  ButtonTonalProps,
} from '@snack-uikit/button';

import { ButtonDropdownProps } from '../ButtonDropdown';
import { ButtonDroplistProps } from '../ButtonDroplist';
import { ButtonKebabProps } from '../ButtonKebab';
import { BUTTON_TYPE } from './constants';

type ButtonDropdownPropsWithoutLayout = Omit<ButtonDropdownProps, 'layoutType'>;
type ButtonKebabPropsWithoutLayout = Omit<ButtonKebabProps, 'layoutType'>;
type ButtonDroplistWithoutLayout = Omit<ButtonDroplistProps, 'layoutType'>;
type ButtonQuotaDropdownWithoutLayout = Omit<QuotaDropdownProps, 'layoutType'>;

export type Action = {
  tooltip?: TooltipProps;
  hidden?: boolean;
} & (
  | ({ variant?: typeof BUTTON_TYPE.Filled } & ButtonFilledProps)
  | ({ variant: typeof BUTTON_TYPE.Outline } & ButtonOutlineProps)
  | ({ variant: typeof BUTTON_TYPE.Tonal } & ButtonTonalProps)
  | ({ variant: typeof BUTTON_TYPE.Function } & ButtonFunctionProps)
  | ({ variant: typeof BUTTON_TYPE.Simple } & ButtonSimpleProps)
  | ({ variant: typeof BUTTON_TYPE.Dropdown } & ButtonDropdownPropsWithoutLayout)
  | ({ variant: typeof BUTTON_TYPE.Kebab } & ButtonKebabPropsWithoutLayout)
  | ({ variant: typeof BUTTON_TYPE.Droplist } & ButtonDroplistWithoutLayout)
  | ({ variant: typeof BUTTON_TYPE.Quota } & ButtonQuotaDropdownWithoutLayout)
);

export type ActionsProps = {
  items: Action[];
  maxVisibleItems?: number;
};
