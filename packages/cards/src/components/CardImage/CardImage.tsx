import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { TruncatedTextWithTooltip } from '../../helperComponents/TruncatedTextWithTooltip';
import * as S from './styled';

export type CardImageProps = WithSupportProps<{
  src: string;
  className?: string;
  title: string;
  description?: string;
  signature?: string;
  onClick(): void;
}>;

export function CardImage({ title, description, signature, src, className, onClick, ...rest }: CardImageProps) {
  return (
    <S.Wrapper className={className} onClick={onClick} {...extractSupportProps(rest)}>
      <S.ImageWrapper>
        <S.Image backgroundImage={src} />
      </S.ImageWrapper>

      <S.Title data-test-id='card-image__title' tag={TruncatedTextWithTooltip.containerTags.H3}>
        {title}
      </S.Title>

      {description && (
        <S.Description data-test-id='card-image__description' tag={TruncatedTextWithTooltip.containerTags.Span}>
          {description}
        </S.Description>
      )}

      {signature && <S.Signature data-test-id='card-image__signature'>{signature}</S.Signature>}
    </S.Wrapper>
  );
}
