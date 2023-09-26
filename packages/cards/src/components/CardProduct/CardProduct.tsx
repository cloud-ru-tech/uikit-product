import { ReactNode } from 'react';

import { Label, LabelProps } from '@sbercloud/uikit-product-label';
import { TruncateString } from '@sbercloud/uikit-product-truncate-string';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import * as S from './styled';

export type CardProductProps = WithSupportProps<{
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
  action?: {
    text: string;
    icon?: ReactNode;
    isAnimated?: boolean;
  };
  onClick?(): void;
  label?: {
    text: string;
    variant: LabelProps['variant'];
  };
}>;

export function CardProduct({
  className,
  icon,
  title,
  description,
  label,
  action,
  onClick,
  ...rest
}: CardProductProps) {
  const isClickable = Boolean(onClick) || undefined;
  const isAnimated = action?.isAnimated || undefined;

  return (
    <S.Wrapper
      className={className}
      onClick={onClick}
      data-clickable={isClickable}
      data-animated={isAnimated}
      {...extractSupportProps(rest)}
    >
      <S.Heading>
        <S.Icon>{icon}</S.Icon>

        <TruncateString
          text={title}
          data-test-id='card-product__title'
          textEntity={TruncateString.textEntities.Text2}
          maxLines={2}
        />
      </S.Heading>

      <S.Description
        data-test-id='card-product__description'
        text={description}
        textEntity={TruncateString.textEntities.Text3}
        maxLines={3}
      />

      <S.Footer>
        {action && (
          <S.ActionContainer>
            <S.ActionText data-clickable={isClickable} data-test-id='card-product__action-text'>
              {action.text}
            </S.ActionText>
            {action.icon && (
              <S.ActionIcon data-clickable={isClickable} data-animated={isAnimated}>
                {action.icon}
              </S.ActionIcon>
            )}
          </S.ActionContainer>
        )}

        {label && (
          <S.Label
            text={label.text}
            variant={label.variant}
            className={isClickable ? S.cursorPointerClassName : undefined}
          />
        )}
      </S.Footer>
    </S.Wrapper>
  );
}

CardProduct.labelVariants = Label.variants;
