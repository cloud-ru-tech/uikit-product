import { FC } from 'react';

import { Button, IButtonProps } from 'components/Button';
import { Badge } from 'components/Badge';

export interface IToolBarButtonProps extends IButtonProps {
  badgeText?: string;
}

export const ToolBarButton: FC<IToolBarButtonProps> = ({
  children,
  className,
  badgeText,
  ...buttonProps
}) => (
  <Button {...buttonProps} variant='table-menu' className={className}>
    {badgeText ? <Badge text={badgeText}>{children}</Badge> : children}
  </Button>
);
