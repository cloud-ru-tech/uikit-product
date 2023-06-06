import { ReactElement, ReactText } from 'react';

import { CommonButtonProps, extractCommonButtonProps, withTooltip } from '@sbercloud/uikit-product-button-private';

import * as S from './styled';

export type ButtonRoundBigProps = CommonButtonProps & {
  text: ReactText;
  icon: ReactElement;
};

function ButtonRoundBigBase({ text, icon, className, ...rest }: ButtonRoundBigProps) {
  return (
    <S.StyledButtonPrivate className={className} {...extractCommonButtonProps(rest)}>
      <S.IconWrapper>{icon}</S.IconWrapper>
      {text}
    </S.StyledButtonPrivate>
  );
}

export const ButtonRoundBig = withTooltip(ButtonRoundBigBase);
