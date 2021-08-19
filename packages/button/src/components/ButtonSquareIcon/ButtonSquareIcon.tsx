import { ReactElement, forwardRef } from 'react';

import { extractCommonButtonProps } from '../../helpers';
import { withTooltip } from '../../hocs';
import { CommonButtonPropsWithRequiredTooltip } from '../../types';
import { Variant } from './constants';
import * as S from './styled';

export type ButtonSquareIconProps = CommonButtonPropsWithRequiredTooltip & {
  icon: ReactElement;
  variant?: Variant;
  rounded?: boolean;
};

const ButtonSquareIconBase = forwardRef<HTMLButtonElement, ButtonSquareIconProps>(
  ({ icon, variant = Variant.Default, ...rest }, ref) => (
    <S.Button data-variant={variant} ref={ref} {...extractCommonButtonProps(rest)}>
      {icon}
    </S.Button>
  ),
);

const ButtonSquareIconWithTooltip = withTooltip(ButtonSquareIconBase);

export const ButtonSquareIcon = ButtonSquareIconWithTooltip as typeof ButtonSquareIconWithTooltip & {
  variants: typeof Variant;
};

ButtonSquareIcon.variants = Variant;
