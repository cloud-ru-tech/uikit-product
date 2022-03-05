import { ReactElement, ReactText } from 'react';

import { extractCommonButtonProps } from '../../helpers';
import { withTooltip } from '../../hocs';
import { CommonButtonProps } from '../../types';
import * as S from './styled';

export type ButtonRoundBigProps = CommonButtonProps & {
  text: ReactText;
  icon: ReactElement;
};

const ButtonRoundBigBase = ({ text, icon, className, ...rest }: ButtonRoundBigProps) => (
  <S.StyledBaseButton className={className} {...extractCommonButtonProps(rest)}>
    <S.IconWrapper>{icon}</S.IconWrapper>
    {text}
  </S.StyledBaseButton>
);

export const ButtonRoundBig = withTooltip(ButtonRoundBigBase);
