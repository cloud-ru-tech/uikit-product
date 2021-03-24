import { FC } from 'react';
import clsx from 'clsx';

import { Button, IButtonProps } from 'components/Button';
import { Badge } from 'components/Badge';

import { toolbarButtonClassName } from './styled';

export interface IToolBarButtonProps extends IButtonProps {
  badgeText?: string;
}

export const ToolBarButton: FC<IToolBarButtonProps> = ({
  children,
  className,
  badgeText,
  ...buttonProps
}) => (
  <Button
    {...buttonProps}
    type='transparent'
    className={clsx(className, toolbarButtonClassName)}
  >
    {badgeText ? <Badge text={badgeText}>{children}</Badge> : children}
  </Button>
);
