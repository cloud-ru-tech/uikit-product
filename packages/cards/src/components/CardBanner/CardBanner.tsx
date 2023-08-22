import { ReactNode } from 'react';

import { Button, ButtonProps } from '@sbercloud/uikit-product-button';
import { TruncateString } from '@sbercloud/uikit-product-truncate-string';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import * as S from './styled';

export type CardBannerProps = WithSupportProps<{
  src: string;
  title: string;
  description: string;
  buttons: ButtonProps[] | ReactNode;
  className?: string;
}>;

export function CardBanner({ title, description, src, buttons, className, ...rest }: CardBannerProps) {
  return (
    <S.Wrapper className={className} {...extractSupportProps(rest)}>
      <S.LeftSide>
        <S.Title
          data-test-id='card-banner__title'
          maxLines={2}
          text={title}
          textEntity={TruncateString.textEntities.H3Semibold}
        />
        <S.Description data-test-id='card-banner__description' maxLines={2} text={description} />

        <S.ButtonsWrapper data-test-id='card-banner__buttons'>
          {buttons instanceof Array
            ? buttons.map((button, index) => <Button key={`${index}${button.text}`} {...button} />)
            : buttons}
        </S.ButtonsWrapper>
      </S.LeftSide>

      <S.RightSide>
        <S.ImageWrapper>
          <S.Image backgroundImage={src} />
        </S.ImageWrapper>
      </S.RightSide>
    </S.Wrapper>
  );
}
