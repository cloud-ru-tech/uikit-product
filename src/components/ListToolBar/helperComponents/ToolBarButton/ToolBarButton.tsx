import { FC } from 'react';

import { TableMenuButton, ITableMenuButtonProps } from 'components/Button';
import { Badge } from 'components/Badge';

export interface IToolBarButtonProps extends ITableMenuButtonProps {
  badgeText?: string;
}

export const ToolBarButton: FC<IToolBarButtonProps> = ({
  children,
  className,
  badgeText,
  ...buttonProps
}) => (
  <TableMenuButton {...buttonProps} className={className}>
    {badgeText ? <Badge text={badgeText}>{children}</Badge> : children}
  </TableMenuButton>
);
