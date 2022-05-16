import { ReactElement, ReactText } from 'react';

import { CommonButtonProps, extractCommonButtonProps, withTooltip } from '@sbercloud/uikit-product-button-private';

import { Variant } from './constants';
import * as S from './styled';

export type ButtonProps = {
  text: ReactText;
  variant?: Variant;
  icon?: ReactElement;
} & CommonButtonProps;

const ButtonCmp = ({ text, variant = Variant.Filled, icon, className, ...rest }: ButtonProps) => (
  <S.StyledButtonPrivate className={className} data-variant={variant} {...extractCommonButtonProps(rest)}>
    {text}
    {icon && <S.IconWrapper>{icon}</S.IconWrapper>}
  </S.StyledButtonPrivate>
);

const ButtonWithTooltip = withTooltip(ButtonCmp);

export const Button = ButtonWithTooltip as typeof ButtonWithTooltip & {
  variants: typeof Variant;
};

Button.variants = Variant;
