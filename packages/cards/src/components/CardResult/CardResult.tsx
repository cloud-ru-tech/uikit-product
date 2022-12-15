import { TruncateString } from '@sbercloud/uikit-product-truncate-string';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

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
      <S.Title data-test-id='card-result__title' textEntity={TruncateString.textEntities.H5} text={title} />

      <S.Description data-test-id='card-result__description' text={description} maxLines={3} />
    </S.Wrapper>
  );
}

CardResult.variants = Variant;
