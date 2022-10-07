import { Button, ButtonProps } from '@sbercloud/uikit-product-button';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { TruncatedTextWithTooltip } from '../../helperComponents/TruncatedTextWithTooltip';
import * as S from './styled';

export type CardBannerProps = WithSupportProps<{
  src: string;
  title: string;
  description: string;
  buttons: ButtonProps[];
  className?: string;
}>;

export function CardBanner({ title, description, src, buttons, className, ...rest }: CardBannerProps) {
  return (
    <S.Wrapper className={className} {...extractSupportProps(rest)}>
      <S.LeftSide>
        <S.Title data-test-id='card-banner__title' tag={TruncatedTextWithTooltip.containerTags.H3}>
          {title}
        </S.Title>

        <S.Description data-test-id='card-banner__description' tag={TruncatedTextWithTooltip.containerTags.Span}>
          {description}
        </S.Description>

        <S.ButtonsWrapper data-test-id='card-banner__buttons'>
          {buttons.map((button, index) => (
            <Button key={`${index}${button.text}`} {...button} />
          ))}
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
