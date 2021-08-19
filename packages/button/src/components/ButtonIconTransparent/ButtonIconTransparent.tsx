import { ReactElement, forwardRef } from 'react';

import { extractCommonButtonProps } from '../../helpers';
import { withTooltip } from '../../hocs';
import { CommonButtonPropsWithRequiredTooltip } from '../../types';
import { Variant } from './constants';
import * as S from './styled';

export type ButtonIconTransparentProps = CommonButtonPropsWithRequiredTooltip & {
  icon: ReactElement;
  variant?: Variant;
  rounded?: boolean;
};

const ButtonIconTransparentBase = forwardRef<HTMLButtonElement, ButtonIconTransparentProps>(
  ({ icon, variant = Variant.Default, rounded, ...rest }, ref) => (
    <S.Button data-variant={variant} data-rounded={rounded || undefined} ref={ref} {...extractCommonButtonProps(rest)}>
      {icon}
    </S.Button>
  ),
);

const ButtonIconTransparentWithTooltip = withTooltip(ButtonIconTransparentBase);

export const ButtonIconTransparent = ButtonIconTransparentWithTooltip as typeof ButtonIconTransparentWithTooltip & {
  variants: typeof Variant;
};

ButtonIconTransparent.variants = Variant;
