import { cx } from '@linaria/core';
import { ReactElement, ReactText } from 'react';

import { BaseButton } from '../../helperComponents';
import { extractCommonButtonProps } from '../../helpers';
import { withTooltip } from '../../hocs';
import { CommonButtonProps } from '../../types';
import * as S from './styled';

export type ButtonRoundBigProps = CommonButtonProps & {
  text: ReactText;
  icon: ReactElement;
};

const ButtonRoundBigBase = ({ text, icon, className, ...rest }: ButtonRoundBigProps) => (
  <BaseButton className={cx(S.buttonRoundBigClassName, className)} {...extractCommonButtonProps(rest)}>
    <S.IconWrapper>{icon}</S.IconWrapper>
    {text}
  </BaseButton>
);

export const ButtonRoundBig = withTooltip(ButtonRoundBigBase);
