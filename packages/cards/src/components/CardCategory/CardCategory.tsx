import { PredefinedDecorIconPrivate } from '@sbercloud/uikit-product-predefined-icons-private';
import { TruncateString } from '@sbercloud/uikit-product-truncate-string';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import * as S from './styled';

enum Variant {
  Filled = 'Filled',
  Outline = 'Outline',
}

export type CardCategoryProps = WithSupportProps<{
  icon: JSX.Element;
  title: string;
  description?: string;
  variant?: Variant;
  className?: string;
  onClick(): void;
}>;

export function CardCategory({
  title,
  description,
  icon,
  variant = Variant.Filled,
  className,
  onClick,
  ...rest
}: CardCategoryProps) {
  return (
    <S.Wrapper className={className} data-variant={variant} onClick={onClick} {...extractSupportProps(rest)}>
      <S.LeftSide>
        <S.Icon type={PredefinedDecorIconPrivate.types.Custom} icon={icon} />
      </S.LeftSide>

      <S.RightSide>
        <S.Title
          data-test-id='card-category__title'
          textEntity={TruncateString.textEntities.H3Semibold}
          maxLines={2}
          text={title}
        />

        {description && <S.Description data-test-id='card-category__description' maxLines={2} text={description} />}
      </S.RightSide>
    </S.Wrapper>
  );
}

CardCategory.variants = Variant;
