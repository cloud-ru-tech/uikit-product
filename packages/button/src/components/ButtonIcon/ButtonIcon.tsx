import { ReactElement, forwardRef } from 'react';

import { extractCommonButtonProps } from '../../helpers';
import { CommonButtonProps } from '../../types';
import { Variant } from './constants';
import * as S from './styled';

export type ButtonIconProps = CommonButtonProps & {
  icon: ReactElement;
  variant?: Variant;
};

const ButtonIconBase = forwardRef<HTMLButtonElement, ButtonIconProps>(
  ({ icon, variant = Variant.Weak, ...rest }, ref) => (
    <S.Button data-variant={variant} ref={ref} {...extractCommonButtonProps(rest)}>
      {icon}
    </S.Button>
  ),
);

export const ButtonIcon = ButtonIconBase as typeof ButtonIconBase & {
  variants: typeof Variant;
};

ButtonIcon.variants = Variant;
