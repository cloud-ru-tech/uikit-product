import { FC } from 'react';
import { cx } from '@linaria/core';

import { Button, IButtonProps } from 'components/Button';
import { Badge } from 'components/Badge';

import { activeToolbarButtonClassName } from './styled';

export interface IToolBarButtonProps extends IButtonProps {
  isActive?: boolean;
  badgeText?: string;
}

export const ToolBarButton: FC<IToolBarButtonProps> = ({
  children,
  className,
  badgeText,
  isActive,
  ...buttonProps
}) => (
  <Button
    {...buttonProps}
    variant='table-menu'
    className={cx(className, isActive ? activeToolbarButtonClassName : null)}
  >
    {badgeText ? <Badge text={badgeText}>{children}</Badge> : children}
  </Button>
);
