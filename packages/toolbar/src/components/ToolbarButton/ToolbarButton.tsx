import { cx } from '@linaria/core';
import { FC } from 'react';

import { Badge } from '@sbercloud/uikit-react-badge-private';
import { ButtonToolbar, ButtonToolbarProps } from '@sbercloud/uikit-react-button';

import { activeToolbarButtonClassName } from './styled';

export interface ToolbarButtonProps extends Omit<ButtonToolbarProps, 'icon'> {
  isActive?: boolean;
  badgeText?: string;
}

export const ToolbarButton: FC<ToolbarButtonProps> = ({ children, className, badgeText, isActive, ...buttonProps }) => (
  <ButtonToolbar
    {...buttonProps}
    className={cx(className, isActive ? activeToolbarButtonClassName : null)}
    icon={badgeText ? () => <Badge text={badgeText}>{children}</Badge> : () => <>{children}</>}
  />
);
