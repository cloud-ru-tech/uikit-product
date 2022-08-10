import { ReactElement } from 'react';

import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import * as S from './styled';

export type NoDataProps = WithSupportProps<{
  image: ReactElement;
  title: string;
  description?: string;
  button?: ReactElement;
}>;

export function NoData({ title, description, image, button, ...rest }: NoDataProps) {
  return (
    <S.Wrapper {...extractSupportProps(rest)}>
      {image}
      <S.DescContainer>
        <S.Title>{title}</S.Title>
        {description && <S.Description>{description}</S.Description>}
      </S.DescContainer>
      {button}
    </S.Wrapper>
  );
}
