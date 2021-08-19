import { ComponentType, forwardRef } from 'react';

import { extractCommonButtonProps } from '../../helpers';
import { CommonButtonProps } from '../../types';
import { Variant } from './constants';
import * as S from './styled';

export type ButtonIconTransparentProps = CommonButtonProps & {
  icon: ComponentType;
  variant?: Variant;
  rounded?: boolean;
};

const ButtonIconTransparentBase = forwardRef<HTMLButtonElement, ButtonIconTransparentProps>(
  ({ icon: Icon, variant = Variant.Default, rounded, ...rest }, ref) => (
    <S.Button data-variant={variant} data-rounded={rounded || undefined} ref={ref} {...extractCommonButtonProps(rest)}>
      <Icon />
    </S.Button>
  ),
);

export const ButtonIconTransparent = ButtonIconTransparentBase as typeof ButtonIconTransparentBase & {
  variants: typeof Variant;
};

ButtonIconTransparent.variants = Variant;
