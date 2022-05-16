import { ReactElement } from 'react';

import {
  CommonButtonPropsWithOptionalTooltip,
  extractCommonButtonProps,
  withTooltip,
} from '@sbercloud/uikit-product-button-private';

import { Variant } from './constants';
import * as S from './styled';

export type ButtonIconTransparentProps = CommonButtonPropsWithOptionalTooltip & {
  icon: ReactElement;
  variant?: Variant;
  rounded?: boolean;
};

const ButtonIconTransparentBase = ({
  icon,
  variant = Variant.Default,
  rounded,
  className,
  ...rest
}: ButtonIconTransparentProps) => (
  <S.StyledButtonPrivate
    className={className}
    data-variant={variant}
    data-rounded={rounded || undefined}
    {...extractCommonButtonProps(rest)}
  >
    {icon}
  </S.StyledButtonPrivate>
);

const ButtonIconTransparentWithTooltip = withTooltip(ButtonIconTransparentBase);

export const ButtonIconTransparent = ButtonIconTransparentWithTooltip as typeof ButtonIconTransparentWithTooltip & {
  variants: typeof Variant;
};

ButtonIconTransparent.variants = Variant;
