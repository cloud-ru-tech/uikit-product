import { ReactElement, forwardRef } from 'react';

import { extractCommonButtonProps } from '../../helpers';
import { withTooltip } from '../../hocs';
import { CommonButtonPropsWithRequiredTooltip } from '../../types';
import { Variant } from './constants';
import * as S from './styled';

export type ButtonIconProps = CommonButtonPropsWithRequiredTooltip & {
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

const ButtonIconWithTooltip = withTooltip(ButtonIconBase);

export const ButtonIcon = ButtonIconWithTooltip as typeof ButtonIconWithTooltip & {
  variants: typeof Variant;
};

ButtonIcon.variants = Variant;
