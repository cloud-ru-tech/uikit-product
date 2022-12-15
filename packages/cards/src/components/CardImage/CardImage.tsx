import { TruncateString } from '@sbercloud/uikit-product-truncate-string';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

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

      <S.Title
        data-test-id='card-image__title'
        textEntity={TruncateString.textEntities.H3Semibold}
        text={title}
        maxLines={2}
      />

      {description && <S.Description data-test-id='card-image__description' text={description} maxLines={2} />}

      {signature && <S.Signature data-test-id='card-image__signature'>{signature}</S.Signature>}
    </S.Wrapper>
  );
}
