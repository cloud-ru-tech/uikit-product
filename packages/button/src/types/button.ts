import { MouseEventHandler } from 'react';

import { WithSupportProps } from '@sbercloud/uikit-utils';

import { WithTooltipProps } from '../hocs';

export type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
};

export type AnchorProps = {
  href: string;
  target?: string;
};

export type CommonButtonProps = WithSupportProps<ButtonProps | AnchorProps> & {
  className?: string;
  disabled?: boolean;
  id?: string;
  onClick?: MouseEventHandler<HTMLElement>;
};

export type CommonButtonPropsWithOptionalTooltip = CommonButtonProps & Pick<WithTooltipProps, 'tooltip'>;
