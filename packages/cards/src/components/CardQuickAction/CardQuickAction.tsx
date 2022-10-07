import { PredefinedDecorIconPrivate } from '@sbercloud/uikit-product-predefined-icons-private';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { TruncatedTextWithTooltip } from '../../helperComponents/TruncatedTextWithTooltip';
import * as S from './styled';

enum Variant {
  Primary = 'Primary',
  Accent = 'Accent',
}

export type CardQuickActionProps = WithSupportProps<{
  icon: JSX.Element;
  className?: string;
  title: string;
  description?: string;
  variant: Variant;
  onClick(): void;
}>;

export function CardQuickAction({
  title,
  description,
  icon,
  variant,
  className,
  onClick,
  ...rest
}: CardQuickActionProps) {
  return (
    <S.Wrapper
      className={className}
      data-variant={variant || undefined}
      onClick={onClick}
      {...extractSupportProps(rest)}
    >
      <S.LeftSide>
        <S.Icon
          type={PredefinedDecorIconPrivate.types.Custom}
          size={PredefinedDecorIconPrivate.sizes.Small}
          icon={icon}
        />
      </S.LeftSide>

      <S.MiddleSide>
        <S.Title
          data-test-id='card-quick-action__title'
          data-variant={variant || undefined}
          tag={TruncatedTextWithTooltip.containerTags.H4}
        >
          {title}
        </S.Title>

        {description && (
          <S.Description
            data-test-id='card-quick-action__description'
            data-variant={variant || undefined}
            tag={TruncatedTextWithTooltip.containerTags.Span}
          >
            {description}
          </S.Description>
        )}
      </S.MiddleSide>

      <S.RightSide>
        <S.PlusIcon size={24} data-variant={variant || undefined} />
      </S.RightSide>
    </S.Wrapper>
  );
}

CardQuickAction.variants = Variant;
