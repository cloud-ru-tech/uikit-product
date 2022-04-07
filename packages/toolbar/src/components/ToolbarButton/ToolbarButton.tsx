import { ReactElement } from 'react';

import { Badge, BadgeProps } from '@sbercloud/uikit-react-badge-private';
import {
  CommonButtonPropsWithOptionalTooltip,
  extractCommonButtonProps,
  withTooltip,
} from '@sbercloud/uikit-react-button-private';

import * as S from './styled';

export type ToolbarButtonProps = CommonButtonPropsWithOptionalTooltip & {
  isActive?: boolean;
  badgeProps?: Omit<BadgeProps, 'children'>;
  icon: ReactElement;
};

const ToolbarButtonBase = ({ icon, className, badgeProps, isActive, ...buttonProps }: ToolbarButtonProps) => (
  <S.StyledButtonPrivate
    data-active={isActive || undefined}
    className={className}
    {...extractCommonButtonProps(buttonProps)}
  >
    {badgeProps ? <Badge {...badgeProps}>{icon}</Badge> : <>{icon}</>}
  </S.StyledButtonPrivate>
);

export const ToolbarButton = withTooltip(ToolbarButtonBase);
