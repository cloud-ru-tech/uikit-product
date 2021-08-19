import { ReactElement, ReactText, forwardRef } from 'react';

import { extractCommonButtonProps } from '../../helpers';
import { withTooltip } from '../../hocs';
import { CommonButtonProps } from '../../types';
import { Variant } from './constants';
import * as S from './styled';

export type ButtonProps = CommonButtonProps & {
  text: ReactText;
  variant?: Variant;
  icon?: ReactElement;
};

const ButtonBase = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ text, variant = Variant.Filled, icon, ...rest }, ref) => (
    <S.Button data-variant={variant} ref={ref} {...extractCommonButtonProps(rest)}>
      {text}
      {icon && <S.IconWrapper>{icon}</S.IconWrapper>}
    </S.Button>
  ),
);

const ButtonWithTooltip = withTooltip(ButtonBase);

export const Button = ButtonWithTooltip as typeof ButtonWithTooltip & {
  variants: typeof Variant;
};

Button.variants = Variant;
