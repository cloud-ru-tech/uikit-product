import { cx } from '@linaria/core';
import { ReactElement, ReactText } from 'react';

import { BaseButton } from '../../helperComponents';
import { extractCommonButtonProps } from '../../helpers';
import { withTooltip } from '../../hocs';
import { CommonButtonProps } from '../../types';
import { Variant } from './constants';
import * as S from './styled';

export type ButtonRoundProps = CommonButtonProps & {
  text?: ReactText;
  variant?: Variant;
  icon?: ReactElement;
};

const ButtonRoundBase = ({ text, variant = Variant.Filled, icon, className, ...rest }: ButtonRoundProps) => (
  <BaseButton
    className={cx(S.buttonRoundClassName, className)}
    data-variant={variant}
    {...extractCommonButtonProps(rest)}
  >
    {text && <S.TextWrapper data-with-icon={Boolean(icon) || undefined}>{text}</S.TextWrapper>}
    {icon && <S.IconWrapper data-variant={variant}>{icon}</S.IconWrapper>}
  </BaseButton>
);

const ButtonRoundWithTooltip = withTooltip(ButtonRoundBase);

export const ButtonRound = ButtonRoundWithTooltip as typeof ButtonRoundWithTooltip & {
  variants: typeof Variant;
};

ButtonRound.variants = Variant;
