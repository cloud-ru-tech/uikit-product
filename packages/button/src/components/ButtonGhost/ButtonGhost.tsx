import { ComponentType, ReactText, forwardRef } from 'react';

import { extractCommonButtonProps } from '../../helpers';
import { CommonButtonProps } from '../../types';
import { IconPosition, Variant } from './constants';
import * as S from './styled';

export type ButtonGhostProps = CommonButtonProps & {
  text: ReactText;
  variant?: Variant;
  icon?: ComponentType;
  iconPosition?: IconPosition;
};

const ButtonGhostBase = forwardRef<HTMLButtonElement, ButtonGhostProps>(
  ({ text, variant = Variant.Accent, icon: Icon, iconPosition = IconPosition.After, ...rest }, ref) => (
    <S.Button data-variant={variant} ref={ref} {...extractCommonButtonProps(rest)}>
      {Icon && iconPosition === IconPosition.Before && (
        <S.IconWrapper data-position={iconPosition}>
          <Icon />
        </S.IconWrapper>
      )}
      {text}
      {Icon && iconPosition === IconPosition.After && (
        <S.IconWrapper data-position={iconPosition}>
          <Icon />
        </S.IconWrapper>
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
