import { ComponentType, forwardRef } from 'react';

import { extractCommonButtonProps } from '../../helpers';
import { CommonButtonProps } from '../../types';
import { Variant } from './constants';
import * as S from './styled';

export type ButtonSquareIconProps = CommonButtonProps & {
  icon: ComponentType;
  variant?: Variant;
  rounded?: boolean;
};

const ButtonSquareIconBase = forwardRef<HTMLButtonElement, ButtonSquareIconProps>(
  ({ icon: Icon, variant = Variant.Default, ...rest }, ref) => (
    <S.Button data-variant={variant} ref={ref} {...extractCommonButtonProps(rest)}>
      <Icon />
    </S.Button>
  ),
);

export const ButtonSquareIcon = ButtonSquareIconBase as typeof ButtonSquareIconBase & {
  variants: typeof Variant;
};

ButtonSquareIcon.variants = Variant;
