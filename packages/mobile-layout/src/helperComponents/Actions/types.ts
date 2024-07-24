import {
  ButtonFilledProps,
  ButtonFunctionProps,
  ButtonOutlineProps,
  ButtonSimpleProps,
  ButtonTonalProps,
} from '@snack-uikit/button';
import { TooltipProps } from '@snack-uikit/tooltip';

import { BUTTON_TYPE } from './constants';

type Action = {
  tooltip?: TooltipProps;
} & (
  | ({ variant?: typeof BUTTON_TYPE.Filled } & ButtonFilledProps)
  | ({ variant: typeof BUTTON_TYPE.Outline } & ButtonOutlineProps)
  | ({ variant: typeof BUTTON_TYPE.Tonal } & ButtonTonalProps)
  | ({ variant: typeof BUTTON_TYPE.Function } & ButtonFunctionProps)
  | ({ variant: typeof BUTTON_TYPE.Simple } & ButtonSimpleProps)
);

export type ActionsProps = {
  items: Action[];
};
