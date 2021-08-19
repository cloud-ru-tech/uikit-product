import { ReactElement, ReactText, forwardRef } from 'react';

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

const ButtonRoundBase = forwardRef<HTMLButtonElement, ButtonRoundProps>(
  ({ text, variant = Variant.Filled, icon, ...rest }, ref) => (
    <S.Button data-variant={variant} ref={ref} {...extractCommonButtonProps(rest)}>
      {text && <S.TextWrapper data-with-icon={Boolean(icon) || undefined}>{text}</S.TextWrapper>}
      {icon && <S.IconWrapper>{icon}</S.IconWrapper>}
    </S.Button>
  ),
);

const ButtonRoundWithTooltip = withTooltip(ButtonRoundBase);

export const ButtonRound = ButtonRoundWithTooltip as typeof ButtonRoundWithTooltip & {
  variants: typeof Variant;
};

ButtonRound.variants = Variant;
