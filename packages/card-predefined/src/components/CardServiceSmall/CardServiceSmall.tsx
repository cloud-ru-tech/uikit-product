import cn from 'classnames';
import { JSXElementConstructor, KeyboardEventHandler, MouseEventHandler, useRef } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { PromoTagPredefined, PromoTagPredefinedProps } from '@cloud-ru/uikit-product-promo-tag-predefined';
import { Card, CardProps } from '@snack-uikit/card';
import { PromoTag } from '@snack-uikit/promo-tag';
import { Favorite } from '@snack-uikit/toggles';
import { TruncateString } from '@snack-uikit/truncate-string';
import { Typography } from '@snack-uikit/typography';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import styles from './styles.module.scss';

export type CardServiceSmallProps = WithSupportProps<
  Pick<CardProps, 'onClick' | 'className' | 'disabled' | 'outline' | 'href' | 'checked'> &
    Required<Pick<Card.HeaderProps, 'title' | 'emblem'>> & {
      truncate?: Pick<NonNullable<Card.HeaderProps['truncate']>, 'title'>;
      favorite?: {
        enabled: boolean;
        visibilityStrategy: 'always' | 'hover';
        checked?: boolean;
        onChange?(value: boolean): void;
      };
      promoBadge?: PromoTagPredefinedProps | CardProps['promoBadge'];
    }
>;

function isIconProps(
  props: Card.HeaderProps['emblem'],
): props is { icon: JSXElementConstructor<{ className?: string }> } {
  return Boolean(props && 'icon' in props);
}

export function CardServiceSmall({
  href,
  promoBadge,
  title,
  emblem,
  onClick,
  className,
  disabled,
  truncate,
  outline,
  checked,
  favorite,
  ...rest
}: CardServiceSmallProps) {
  const [isFavourite, setIsFavorite] = useUncontrolledProp(favorite?.checked, false, favorite?.onChange);
  const favoriteRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = isIconProps(emblem) ? emblem.icon : undefined;

  const onCardKeyDown: KeyboardEventHandler = event => {
    if (event.code === 'ArrowRight') {
      favoriteRef.current?.focus();
    }
  };

  const onFavoriteKeyUp: KeyboardEventHandler = event => {
    event.preventDefault();

    if (event.code === 'ArrowLeft') {
      cardRef.current?.focus();
    }

    if (event.code === 'Space' || event.code === 'Enter') {
      setIsFavorite(!isFavourite);
    }
  };

  const onFavoriteClick: MouseEventHandler = event => {
    event.stopPropagation();

    favoriteRef.current?.blur();
  };

  return (
    <div className={cn(styles.wrapper, className)}>
      <Card
        {...extractSupportProps(rest)}
        href={href}
        ref={cardRef}
        onKeyDown={onCardKeyDown}
        header={
          <div className={styles.contentWrapper}>
            {Icon && <Icon className={styles.icon} />}

            <div className={styles.contentLayout}>
              <Typography
                family='sans'
                size='s'
                purpose='title'
                className={styles.title}
                data-test-id='card-service-small__title'
              >
                <TruncateString text={title} maxLines={truncate?.title} variant='end' />
              </Typography>
            </div>

            {favorite && favorite.enabled && (
              <div className={styles.favoriteWrapper} data-visibility-strategy={favorite.visibilityStrategy}>
                <Favorite
                  size='m'
                  checked={isFavourite}
                  inputRef={favoriteRef}
                  onChange={setIsFavorite}
                  tabIndex={-1}
                  onKeyUp={onFavoriteKeyUp}
                  onClick={onFavoriteClick}
                  data-test-id='card-service-small__favorite'
                  icon='star'
                />
              </div>
            )}
          </div>
        }
        onClick={onClick}
        disabled={disabled}
        outline={outline}
        checked={checked}
        size='s'
      />

      {promoBadge && (
        <div className={styles.promoTagWrapper}>
          {typeof promoBadge === 'object' && 'variant' in promoBadge ? (
            <PromoTagPredefined data-test-id='card-service-small__promo-badge' {...promoBadge} />
          ) : (
            <PromoTag
              color='decor'
              {...(typeof promoBadge === 'string' ? { text: promoBadge, appearance: 'primary' } : promoBadge)}
              data-test-id='card-service-small__promo-badge'
            />
          )}
        </div>
      )}
    </div>
  );
}
