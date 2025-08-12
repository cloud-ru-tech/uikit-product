import { TooltipProps } from '@sbercloud/uikit-product-mobile-tooltip';
import {
  ButtonFilledProps,
  ButtonFunctionProps,
  ButtonOutlineProps,
  ButtonSimpleProps,
  ButtonTonalProps,
} from '@snack-uikit/button';

import { BUTTON_TYPE } from './constants';

export type Action = {
  tooltip?: TooltipProps;
  hidden?: boolean;
} & (
  | ({ variant?: typeof BUTTON_TYPE.Filled } & ButtonFilledProps)
  | ({ variant: typeof BUTTON_TYPE.Outline } & ButtonOutlineProps)
  | ({ variant: typeof BUTTON_TYPE.Tonal } & ButtonTonalProps)
  | ({ variant: typeof BUTTON_TYPE.Function } & ButtonFunctionProps)
  | ({ variant: typeof BUTTON_TYPE.Simple } & ButtonSimpleProps)
);

export type ActionsProps = {
  items: Action[];
  maxVisibleItems?: number;
};
