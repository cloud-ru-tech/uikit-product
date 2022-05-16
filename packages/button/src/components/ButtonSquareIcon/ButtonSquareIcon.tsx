import { ReactElement } from 'react';

import {
  CommonButtonPropsWithOptionalTooltip,
  extractCommonButtonProps,
  withTooltip,
} from '@sbercloud/uikit-product-button-private';

import { Variant } from './constants';
import * as S from './styled';

export type ButtonSquareIconProps = CommonButtonPropsWithOptionalTooltip & {
  icon: ReactElement;
  variant?: Variant;
};

const ButtonSquareIconBase = ({ icon, variant = Variant.Default, className, ...rest }: ButtonSquareIconProps) => (
  <S.StyledButtonPrivate className={className} data-variant={variant} {...extractCommonButtonProps(rest)}>
    {icon}
  </S.StyledButtonPrivate>
);

const ButtonSquareIconWithTooltip = withTooltip(ButtonSquareIconBase);

export const ButtonSquareIcon = ButtonSquareIconWithTooltip as typeof ButtonSquareIconWithTooltip & {
  variants: typeof Variant;
};

ButtonSquareIcon.variants = Variant;
