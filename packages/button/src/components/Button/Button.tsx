import { ReactElement, ReactText } from 'react';

import { extractCommonButtonProps } from '../../helpers';
import { withTooltip } from '../../hocs';
import { CommonButtonProps } from '../../types';
import { Variant } from './constants';
import * as S from './styled';

export type ButtonProps = {
  text: ReactText;
  variant?: Variant;
  icon?: ReactElement;
} & CommonButtonProps;

const ButtonCmp = ({ text, variant = Variant.Filled, icon, className, ...rest }: ButtonProps) => (
  <S.StyledBaseButton className={className} data-variant={variant} {...extractCommonButtonProps(rest)}>
    {text}
    {icon && <S.IconWrapper>{icon}</S.IconWrapper>}
  </S.StyledBaseButton>
);

const ButtonWithTooltip = withTooltip(ButtonCmp);

export const Button = ButtonWithTooltip as typeof ButtonWithTooltip & {
  variants: typeof Variant;
};

Button.variants = Variant;
