import { ComponentType, ReactText, forwardRef } from 'react';

import { extractCommonButtonProps } from '../../helpers';
import { CommonButtonProps } from '../../types';
import { Variant } from './constants';
import * as S from './styled';

export type ButtonRoundProps = CommonButtonProps & {
  text?: ReactText;
  variant?: Variant;
  icon?: ComponentType;
};

const ButtonRoundBase = forwardRef<HTMLButtonElement, ButtonRoundProps>(
  ({ text, variant = Variant.Filled, icon: Icon, ...rest }, ref) => (
    <S.Button data-variant={variant} ref={ref} {...extractCommonButtonProps(rest)}>
      {text && <S.TextWrapper data-with-icon={Boolean(Icon) || undefined}>{text}</S.TextWrapper>}
      {Icon && (
        <S.IconWrapper>
          <Icon />
        </S.IconWrapper>
      )}
    </S.Button>
  ),
);

export const ButtonRound = ButtonRoundBase as typeof ButtonRoundBase & {
  variants: typeof Variant;
};

ButtonRound.variants = Variant;
