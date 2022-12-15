import { PredefinedDecorIconPrivate } from '@sbercloud/uikit-product-predefined-icons-private';
import { TruncateString } from '@sbercloud/uikit-product-truncate-string';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

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
          textEntity={TruncateString.textEntities.H4Semibold}
          text={title}
        />

        {description && (
          <S.Description
            data-test-id='card-quick-action__description'
            data-variant={variant || undefined}
            text={description}
          />
        )}
      </S.MiddleSide>

      <S.RightSide>
        <S.PlusIcon size={24} data-variant={variant || undefined} />
      </S.RightSide>
    </S.Wrapper>
  );
}

CardQuickAction.variants = Variant;
