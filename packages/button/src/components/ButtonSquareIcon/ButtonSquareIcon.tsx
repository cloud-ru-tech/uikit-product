import { ReactElement } from 'react';

import { extractCommonButtonProps } from '../../helpers';
import { withTooltip } from '../../hocs';
import { CommonButtonPropsWithOptionalTooltip } from '../../types';
import { Variant } from './constants';
import * as S from './styled';

export type ButtonSquareIconProps = CommonButtonPropsWithOptionalTooltip & {
  icon: ReactElement;
  variant?: Variant;
};

const ButtonSquareIconBase = ({ icon, variant = Variant.Default, className, ...rest }: ButtonSquareIconProps) => (
  <S.StyledBaseButton className={className} data-variant={variant} {...extractCommonButtonProps(rest)}>
    {icon}
  </S.StyledBaseButton>
);

const ButtonSquareIconWithTooltip = withTooltip(ButtonSquareIconBase);

export const ButtonSquareIcon = ButtonSquareIconWithTooltip as typeof ButtonSquareIconWithTooltip & {
  variants: typeof Variant;
};

ButtonSquareIcon.variants = Variant;
