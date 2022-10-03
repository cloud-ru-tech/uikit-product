import { PredefinedDecorIconPrivate } from '@sbercloud/uikit-product-predefined-icons-private';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { TruncatedTextWithTooltip } from '../../helperComponents/TruncatedTextWithTooltip';
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
        <S.Title tag={TruncatedTextWithTooltip.containerTags.H3}>{title}</S.Title>

        {description && <S.Description tag={TruncatedTextWithTooltip.containerTags.Span}>{description}</S.Description>}
      </S.RightSide>
    </S.Wrapper>
  );
}

CardCategory.variants = Variant;
