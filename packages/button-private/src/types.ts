import { MouseEventHandler } from 'react';

import { TooltipProps } from '@sbercloud/uikit-product-tooltip';
import { WithSupportProps } from '@sbercloud/uikit-product-utils';

export type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
};

export type AnchorProps = {
  href: string;
  target?: string;
};

export type WithManagedLoadingProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
};

export type WithTooltipProps = {
  className?: CommonButtonProps['className'];
  tooltip?: {
    title?: TooltipProps['title'];
    content?: TooltipProps['content'];
    placement?: TooltipProps['placement'];
  };
  disabledTooltip?: {
    title?: TooltipProps['title'];
    content?: TooltipProps['content'];
    placement?: TooltipProps['placement'];
  };
};

export type CommonButtonProps = WithSupportProps<ButtonProps | AnchorProps> & {
  className?: string;
  disabled?: boolean;
  id?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  tabIndex?: number;
};

export type CommonButtonPropsWithOptionalTooltip = CommonButtonProps & Pick<WithTooltipProps, 'tooltip'>;
