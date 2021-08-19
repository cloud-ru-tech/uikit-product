import { ReactElement, ReactText, forwardRef } from 'react';

import { extractCommonButtonProps } from '../../helpers';
import { withTooltip } from '../../hocs';
import { CommonButtonProps } from '../../types';
import * as S from './styled';

export type ButtonRoundBigProps = CommonButtonProps & {
  text: ReactText;
  icon: ReactElement;
};

const ButtonRoundBigBase = forwardRef<HTMLButtonElement, ButtonRoundBigProps>(({ text, icon, ...rest }, ref) => (
  <S.Button ref={ref} {...extractCommonButtonProps(rest)}>
    <S.IconWrapper>{icon}</S.IconWrapper>
    {text}
  </S.Button>
));

export const ButtonRoundBig = withTooltip(ButtonRoundBigBase);
