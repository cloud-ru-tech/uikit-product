import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { TruncatedTextWithTooltip } from '../../helperComponents/TruncatedTextWithTooltip';
import * as S from './styled';

enum Variant {
  Filled = 'Filled',
  Outline = 'Outline',
}

export type CardResultProps = WithSupportProps<{
  title: string;
  description: string;
  className?: string;
  onClick(): void;
}>;

export function CardResult({ title, description, className, onClick, ...rest }: CardResultProps) {
  return (
    <S.Wrapper className={className} onClick={onClick} {...extractSupportProps(rest)}>
      <S.Title tag={TruncatedTextWithTooltip.containerTags.H5}>{title}</S.Title>

      <S.Description tag={TruncatedTextWithTooltip.containerTags.Span}>{description}</S.Description>
    </S.Wrapper>
  );
}

CardResult.variants = Variant;
