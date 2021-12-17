import { cx } from '@linaria/core';
import { ReactElement, ReactText } from 'react';

import { BaseButton } from '../../helperComponents';
import { extractCommonButtonProps } from '../../helpers';
import { withTooltip } from '../../hocs';
import { CommonButtonProps } from '../../types';
import { IconPosition, Variant } from './constants';
import * as S from './styled';

export type ButtonGhostProps = {
  text: ReactText;
  variant?: Variant;
  icon?: ReactElement;
  iconPosition?: IconPosition;
} & CommonButtonProps;

const ButtonGhostBase = ({
  text,
  variant = Variant.Accent,
  icon,
  iconPosition = IconPosition.After,
  className,
  ...rest
}: ButtonGhostProps) => (
  <BaseButton
    className={cx(S.buttonGhostClassName, className)}
    data-variant={variant}
    {...extractCommonButtonProps(rest)}
  >
    {icon && iconPosition === IconPosition.Before && <S.IconWrapper data-position={iconPosition}>{icon}</S.IconWrapper>}
    {text}
    {icon && iconPosition === IconPosition.After && <S.IconWrapper data-position={iconPosition}>{icon}</S.IconWrapper>}
  </BaseButton>
);

const ButtonGhostWithTooltip = withTooltip(ButtonGhostBase);

export const ButtonGhost = ButtonGhostWithTooltip as typeof ButtonGhostWithTooltip & {
  variants: typeof Variant;
  iconPosition: typeof IconPosition;
};

ButtonGhost.variants = Variant;
ButtonGhost.iconPosition = IconPosition;
