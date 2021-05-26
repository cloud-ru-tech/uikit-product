import { cx } from '@linaria/core';
import { FC } from 'react';

import { Badge } from '@sbercloud/uikit-react-badge-private';
import { Button, ButtonProps } from '@sbercloud/uikit-react-button';

import { activeToolbarButtonClassName } from './styled';

export interface ToolbarButtonProps extends ButtonProps {
  isActive?: boolean;
  badgeText?: string;
}

export const ToolbarButton: FC<ToolbarButtonProps> = ({ children, className, badgeText, isActive, ...buttonProps }) => (
  <Button
    {...buttonProps}
    variant={Button.variants.TableMenu}
    className={cx(className, isActive ? activeToolbarButtonClassName : null)}
  >
    {badgeText ? <Badge text={badgeText}>{children}</Badge> : children}
  </Button>
);
