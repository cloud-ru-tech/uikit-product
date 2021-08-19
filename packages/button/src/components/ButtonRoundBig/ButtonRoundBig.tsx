import { ComponentType, ReactText, forwardRef } from 'react';

import { extractCommonButtonProps } from '../../helpers';
import { CommonButtonProps } from '../../types';
import * as S from './styled';

export type ButtonRoundBigProps = CommonButtonProps & {
  text: ReactText;
  icon: ComponentType;
};

export const ButtonRoundBig = forwardRef<HTMLButtonElement, ButtonRoundBigProps>(
  ({ text, icon: Icon, ...rest }, ref) => (
    <S.Button ref={ref} {...extractCommonButtonProps(rest)}>
      <S.IconWrapper>
        <Icon />
      </S.IconWrapper>
      {text}
    </S.Button>
  ),
);
