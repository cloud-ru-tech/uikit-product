import { ReactElement, ReactText } from 'react';

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
  <S.StyledBaseButton className={className} data-variant={variant} {...extractCommonButtonProps(rest)}>
    {text && <S.TextWrapper data-with-icon={Boolean(icon) || undefined}>{text}</S.TextWrapper>}
    {icon && <S.IconWrapper data-variant={variant}>{icon}</S.IconWrapper>}
  </S.StyledBaseButton>
);

const ButtonRoundWithTooltip = withTooltip(ButtonRoundBase);

export const ButtonRound = ButtonRoundWithTooltip as typeof ButtonRoundWithTooltip & {
  variants: typeof Variant;
};

ButtonRound.variants = Variant;
