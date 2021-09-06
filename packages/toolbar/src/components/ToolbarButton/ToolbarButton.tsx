import { cx } from '@linaria/core';
import { FC } from 'react';

import { Badge, BadgeProps } from '@sbercloud/uikit-react-badge-private';
import { ButtonToolbar, ButtonToolbarProps } from '@sbercloud/uikit-react-button';

import { activeToolbarButtonClassName } from './styled';

export interface ToolbarButtonProps extends Omit<ButtonToolbarProps, 'icon'> {
  isActive?: boolean;
  badgeProps?: Omit<BadgeProps, 'children'>;
}

export const ToolbarButton: FC<ToolbarButtonProps> = ({
  children,
  className,
  badgeProps,
  isActive,
  ...buttonProps
}) => (
  <ButtonToolbar
    {...buttonProps}
    className={cx(className, isActive ? activeToolbarButtonClassName : null)}
    icon={badgeProps ? <Badge {...badgeProps}>{children}</Badge> : <>{children}</>}
  />
);
