import { TooltipProps } from '@sbercloud/uikit-react-tooltip';
import { WithSupportProps } from '@sbercloud/uikit-utils';

import { SwitchProps } from '../Switch';

type SwitchRowOwnProps = {
  title: string;
  description?: string;
  tooltip?: Pick<TooltipProps, 'title' | 'content' | 'placement'>;
};

export type SwitchRowProps = WithSupportProps<Omit<SwitchProps, 'size'> & SwitchRowOwnProps>;
