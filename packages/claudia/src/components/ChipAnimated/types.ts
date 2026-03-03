import { ValueOf } from '@snack-uikit/utils';

import { TOOLTIP_STATE, VARIANT } from './constants';

export type Variant = ValueOf<typeof VARIANT>;

export type TooltipState = ValueOf<typeof TOOLTIP_STATE>;

export type ChipAnimatedTooltipProps = {
  position: 'top' | 'bottom';
  label: string;
};
