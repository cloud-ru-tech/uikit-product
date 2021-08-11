import { cx } from '@linaria/core';
import { FC } from 'react';

import { Badge } from '@sbercloud/uikit-react-badge-private';
import { Button, ButtonProps } from '@sbercloud/uikit-react-button';
import { WithSupportProps } from '@sbercloud/uikit-utils';

import { activeToolbarButtonClassName } from './styled';

export interface ToolbarButtonProps extends ButtonProps {
  isActive?: boolean;
  badgeText?: string;
}

export const ToolbarButton: FC<WithSupportProps<ToolbarButtonProps>> = ({
  children,
  className,
  badgeText,
  isActive,
  ...buttonAndSupportProps
}) => (
  <div data-test-id='toolbar__btn'>
    <Button
      {...buttonAndSupportProps}
      variant={Button.variants.TableMenu}
      className={cx(className, isActive ? activeToolbarButtonClassName : null)}
    >
      {badgeText ? <Badge text={badgeText}>{children}</Badge> : children}
    </Button>
  </div>
);
