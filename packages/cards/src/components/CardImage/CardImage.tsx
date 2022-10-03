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

      <S.Title tag={TruncatedTextWithTooltip.containerTags.H3}>{title}</S.Title>

      {description && <S.Description tag={TruncatedTextWithTooltip.containerTags.Span}>{description}</S.Description>}

      <S.Signature>{signature}</S.Signature>
    </S.Wrapper>
  );
}
