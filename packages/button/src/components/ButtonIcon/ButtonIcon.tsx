import { ReactElement } from 'react';

import {
  CommonButtonPropsWithOptionalTooltip,
  extractCommonButtonProps,
  withTooltip,
} from '@sbercloud/uikit-product-button-private';

import { Variant } from './constants';
import * as S from './styled';

export type ButtonIconProps = CommonButtonPropsWithOptionalTooltip & {
  icon: ReactElement;
  variant?: Variant;
};

function ButtonIconBase({ icon, variant = Variant.Weak, className, ...rest }: ButtonIconProps) {
  return (
    <S.StyledButtonPrivate className={className} data-variant={variant} {...extractCommonButtonProps(rest)}>
      {icon}
    </S.StyledButtonPrivate>
  );
}

const ButtonIconWithTooltip = withTooltip(ButtonIconBase);

export const ButtonIcon = ButtonIconWithTooltip as typeof ButtonIconWithTooltip & {
  variants: typeof Variant;
};

ButtonIcon.variants = Variant;
