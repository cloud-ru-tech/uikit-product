import { TooltipProps } from '@sbercloud/uikit-product-tooltip';
import { WithSupportProps } from '@sbercloud/uikit-product-utils';

import { SwitchProps } from '../Switch';

type BaseTooltipProps = Pick<TooltipProps, 'title' | 'content' | 'placement'>;

type EnabledSwitchRowOwnProps = {
  disabled?: false;
};

type DisabledSwitchRowOwnProps = {
  disabledToggleTooltip?: BaseTooltipProps;
  disabled: true;
};

type SwitchRowOwnProps = {
  title: string;
  description?: string;
  disabledToggleTooltip?: BaseTooltipProps;
  tooltip?: BaseTooltipProps;
} & (EnabledSwitchRowOwnProps | DisabledSwitchRowOwnProps);

export type SwitchRowProps = WithSupportProps<Omit<SwitchProps, 'size' | 'disabled'> & SwitchRowOwnProps>;
