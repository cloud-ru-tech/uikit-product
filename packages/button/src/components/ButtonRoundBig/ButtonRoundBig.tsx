import { ReactElement, ReactText, forwardRef } from 'react';

import { extractCommonButtonProps } from '../../helpers';
import { CommonButtonProps } from '../../types';
import * as S from './styled';

export type ButtonRoundBigProps = CommonButtonProps & {
  text: ReactText;
  icon: ReactElement;
};

export const ButtonRoundBig = forwardRef<HTMLButtonElement, ButtonRoundBigProps>(({ text, icon, ...rest }, ref) => (
  <S.Button ref={ref} {...extractCommonButtonProps(rest)}>
    <S.IconWrapper>{icon}</S.IconWrapper>
    {text}
  </S.Button>
));
