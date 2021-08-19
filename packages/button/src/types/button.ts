import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import { WithSupportProps } from '@sbercloud/uikit-utils';

import { WithTooltipProps } from '../hocs';

export type CommonButtonProps = WithSupportProps<
  Pick<
    DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    'id' | 'className' | 'type' | 'disabled' | 'onClick'
  >
>;

export type CommonButtonPropsWithRequiredTooltip = CommonButtonProps & Required<Pick<WithTooltipProps, 'tooltip'>>;
