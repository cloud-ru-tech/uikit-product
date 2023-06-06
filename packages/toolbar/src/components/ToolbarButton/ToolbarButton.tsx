import { ReactElement } from 'react';

import { Badge, BadgeProps } from '@sbercloud/uikit-product-badge-private';
import {
  CommonButtonPropsWithOptionalTooltip,
  extractCommonButtonProps,
  withTooltip,
} from '@sbercloud/uikit-product-button-private';

import * as S from './styled';

export type ToolbarButtonProps = CommonButtonPropsWithOptionalTooltip & {
  isActive?: boolean;
  badgeProps?: Omit<BadgeProps, 'children'>;
  icon: ReactElement;
};

function ToolbarButtonBase({ icon, className, badgeProps, isActive, ...buttonProps }: ToolbarButtonProps) {
  return (
    <S.StyledButtonPrivate
      data-active={isActive || undefined}
      className={className}
      {...extractCommonButtonProps(buttonProps)}
    >
      {badgeProps ? <Badge {...badgeProps}>{icon}</Badge> : <>{icon}</>}
    </S.StyledButtonPrivate>
  );
}

export const ToolbarButton = withTooltip(ToolbarButtonBase);
