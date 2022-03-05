import { ReactElement } from 'react';

import { extractCommonButtonProps } from '../../helpers';
import { withTooltip } from '../../hocs';
import { CommonButtonPropsWithOptionalTooltip } from '../../types';
import { Variant } from './constants';
import * as S from './styled';

export type ButtonIconProps = CommonButtonPropsWithOptionalTooltip & {
  icon: ReactElement;
  variant?: Variant;
};

const ButtonIconBase = ({ icon, variant = Variant.Weak, className, ...rest }: ButtonIconProps) => (
  <S.StyledBaseButton className={className} data-variant={variant} {...extractCommonButtonProps(rest)}>
    {icon}
  </S.StyledBaseButton>
);

const ButtonIconWithTooltip = withTooltip(ButtonIconBase);

export const ButtonIcon = ButtonIconWithTooltip as typeof ButtonIconWithTooltip & {
  variants: typeof Variant;
};

ButtonIcon.variants = Variant;
