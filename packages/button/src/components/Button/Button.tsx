import { ComponentType, ReactText, forwardRef } from 'react';

import { extractCommonButtonProps } from '../../helpers';
import { CommonButtonProps } from '../../types';
import { Variant } from './constants';
import * as S from './styled';

export type ButtonProps = CommonButtonProps & {
  text: ReactText;
  variant?: Variant;
  icon?: ComponentType;
};

const ButtonBase = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ text, variant = Variant.Filled, icon: Icon, ...rest }, ref) => (
    <S.Button data-variant={variant} ref={ref} {...extractCommonButtonProps(rest)}>
      {text}
      {Icon && (
        <S.IconWrapper>
          <Icon />
        </S.IconWrapper>
      )}
    </S.Button>
  ),
);

export const Button = ButtonBase as typeof ButtonBase & {
  variants: typeof Variant;
};

Button.variants = Variant;
