import { TooltipProps } from '@sbercloud/uikit-product-tooltip';
import { WithSupportProps } from '@sbercloud/uikit-product-utils';

import { SwitchProps } from '../Switch';

type SwitchRowOwnProps = {
  title: string;
  description?: string;
  tooltip?: Pick<TooltipProps, 'title' | 'content' | 'placement'>;
};

export type SwitchRowProps = WithSupportProps<Omit<SwitchProps, 'size'> & SwitchRowOwnProps>;
