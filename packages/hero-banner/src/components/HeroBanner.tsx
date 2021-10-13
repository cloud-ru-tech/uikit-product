import { ReactElement } from 'react';

import { H1 } from '@sbercloud/uikit-typography';

import * as S from './styled';

export type HeroBannerProps = {
  title: string;
  text: string;
  productBadge?: ReactElement;
  className?: string;
  button?: ReactElement;
};

export function HeroBanner({ title, text, productBadge, button, className }: HeroBannerProps) {
  return (
    <S.Banner className={className}>
      {productBadge}
      <S.ContentWrap>
        <H1>{title}</H1>
        <S.Text>{text}</S.Text>
        {button}
      </S.ContentWrap>
    </S.Banner>
  );
}
