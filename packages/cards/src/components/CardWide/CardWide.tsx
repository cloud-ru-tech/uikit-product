import { Button, ButtonProps } from '@sbercloud/uikit-product-button';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { TruncatedTextWithTooltip } from '../../helperComponents/TruncatedTextWithTooltip';
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

          <S.Title tag={TruncatedTextWithTooltip.containerTags.H3}>{title}</S.Title>
        </S.TitleWrapper>

        <S.Description tag={TruncatedTextWithTooltip.containerTags.Span}>{description}</S.Description>

        <S.ButtonsWrapper>
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
