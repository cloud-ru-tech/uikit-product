import { Button, ButtonProps } from '@sbercloud/uikit-product-button';
import { TruncateString } from '@sbercloud/uikit-product-truncate-string';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import * as S from './styled';

export type CardWideProps = WithSupportProps<{
  title: string;
  titleImageSrc?: string;
  description: string;
  className?: string;
  buttons: ButtonProps[];
  imageSrc: string;
}>;

export function CardWide({ title, titleImageSrc, description, className, buttons, imageSrc, ...rest }: CardWideProps) {
  return (
    <S.Wrapper className={className} {...extractSupportProps(rest)}>
      <S.LeftSide>
        <S.TitleWrapper>
          {titleImageSrc && (
            <S.TitleImageWrapper>
              <S.TitleImage backgroundImage={titleImageSrc} />
            </S.TitleImageWrapper>
          )}

          <S.Title
            data-test-id='card-wide__title'
            textEntity={TruncateString.textEntities.H3Semibold}
            text={title}
            maxLines={2}
          />
        </S.TitleWrapper>

        <S.Description
          data-test-id='card-wide__description'
          textEntity={TruncateString.textEntities.Text1}
          text={description}
          maxLines={4}
        />

        <S.ButtonsWrapper data-test-id='card-wide__buttons'>
          {buttons.map((button, index) => (
            <Button key={`${index}${button.text}`} {...button} />
          ))}
        </S.ButtonsWrapper>
      </S.LeftSide>

      <S.RightSide>
        <S.ImageWrapper>
          <S.Image backgroundImage={imageSrc} />
        </S.ImageWrapper>
      </S.RightSide>
    </S.Wrapper>
  );
}
