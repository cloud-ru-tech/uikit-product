import { ReactElement, ReactText, forwardRef } from 'react';

import { extractCommonButtonProps } from '../../helpers';
import { CommonButtonProps } from '../../types';
import { IconPosition, Variant } from './constants';
import * as S from './styled';

export type ButtonGhostProps = CommonButtonProps & {
  text: ReactText;
  variant?: Variant;
  icon?: ReactElement;
  iconPosition?: IconPosition;
};

const ButtonGhostBase = forwardRef<HTMLButtonElement, ButtonGhostProps>(
  ({ text, variant = Variant.Accent, icon, iconPosition = IconPosition.After, ...rest }, ref) => (
    <S.Button data-variant={variant} ref={ref} {...extractCommonButtonProps(rest)}>
      {icon && iconPosition === IconPosition.Before && (
        <S.IconWrapper data-position={iconPosition}>{icon}</S.IconWrapper>
      )}
      {text}
      {icon && iconPosition === IconPosition.After && (
        <S.IconWrapper data-position={iconPosition}>{icon}</S.IconWrapper>
      )}
    </S.Button>
  ),
);

export const ButtonGhost = ButtonGhostBase as typeof ButtonGhostBase & {
  variants: typeof Variant;
  iconPosition: typeof IconPosition;
};

ButtonGhost.variants = Variant;
ButtonGhost.iconPosition = IconPosition;
