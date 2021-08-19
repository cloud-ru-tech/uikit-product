import { ComponentType, forwardRef } from 'react';

import { extractCommonButtonProps } from '../../helpers';
import { CommonButtonProps } from '../../types';
import { Variant } from './constants';
import * as S from './styled';

export type ButtonIconProps = CommonButtonProps & {
  icon: ComponentType;
  variant?: Variant;
};

const ButtonIconBase = forwardRef<HTMLButtonElement, ButtonIconProps>(
  ({ icon: Icon, variant = Variant.Weak, ...rest }, ref) => (
    <S.Button data-variant={variant} ref={ref} {...extractCommonButtonProps(rest)}>
      <Icon />
    </S.Button>
  ),
);

export const ButtonIcon = ButtonIconBase as typeof ButtonIconBase & {
  variants: typeof Variant;
};

ButtonIcon.variants = Variant;
