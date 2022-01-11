import { cx } from '@linaria/core';
import { ReactElement } from 'react';

import { BaseButton } from '../../helperComponents';
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
  <BaseButton
    className={cx(S.buttonIconClassName, className)}
    data-variant={variant}
    {...extractCommonButtonProps(rest)}
  >
    {icon}
  </BaseButton>
);

const ButtonIconWithTooltip = withTooltip(ButtonIconBase);

export const ButtonIcon = ButtonIconWithTooltip as typeof ButtonIconWithTooltip & {
  variants: typeof Variant;
};

ButtonIcon.variants = Variant;
