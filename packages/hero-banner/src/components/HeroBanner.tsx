import { ReactElement } from 'react';

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
        <S.Header>{title}</S.Header>
        <S.Text>{text}</S.Text>
        {button}
      </S.ContentWrap>
    </S.Banner>
  );
}
