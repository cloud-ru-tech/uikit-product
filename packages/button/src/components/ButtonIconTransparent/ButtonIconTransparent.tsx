import { ReactElement } from 'react';

import { extractCommonButtonProps } from '../../helpers';
import { withTooltip } from '../../hocs';
import { CommonButtonPropsWithOptionalTooltip } from '../../types';
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
  <S.StyledBaseButton
    className={className}
    data-variant={variant}
    data-rounded={rounded || undefined}
    {...extractCommonButtonProps(rest)}
  >
    {icon}
  </S.StyledBaseButton>
);

const ButtonIconTransparentWithTooltip = withTooltip(ButtonIconTransparentBase);

export const ButtonIconTransparent = ButtonIconTransparentWithTooltip as typeof ButtonIconTransparentWithTooltip & {
  variants: typeof Variant;
};

ButtonIconTransparent.variants = Variant;
