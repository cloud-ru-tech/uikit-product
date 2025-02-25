import { AnchorHTMLAttributes, KeyboardEvent, MouseEvent, useRef } from 'react';

import { TagPredefined, TagPredefinedProps } from '@sbercloud/uikit-product-site-tag';
import { extractSupportProps, WithLayoutType, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { Card, CardProps } from '@snack-uikit/card';
import { Typography } from '@snack-uikit/typography';

import { TRIGGER_CLICK_KEY_CODES } from '../../constants';
import { Icon, IconProps } from '../../helperComponents/Icon';
import { noop } from '../utils';
import { MapLayoutToTitleTypography } from './constants';
import styles from './styles.module.scss';

type GetPromoTagProps<T> = T extends TagPredefinedProps & { variant: 'promo' } ? T : never;
type TagProps = Omit<GetPromoTagProps<TagPredefinedProps>, 'variant' | 'size'>;

export type CardProductProps = WithSupportProps<
  WithLayoutType<{
    title: string;
    description?: string;
    icon: IconProps['icon'];
    href?: string;
    target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
    disabled?: boolean;
    onClick?: CardProps['onClick'];
    tags?: TagProps[];
    className?: string;
  }>
>;

export function CardProduct({
  className,
  layoutType,
  icon,
  title,
  description,
  href,
  target,
  onClick,
  disabled,
  tags,
  ...rest
}: CardProductProps) {
  const Title = MapLayoutToTitleTypography[layoutType];

  const dataTestId = rest['data-test-id'] ?? 'card-info';

  const ref = useRef<HTMLAnchorElement>(null);

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }

    onClick?.(e);
  };

  const handleCardClick = disabled || !href ? undefined : noop;

  const handleCardKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;

    if (TRIGGER_CLICK_KEY_CODES.includes(e.key)) {
      ref?.current?.click();
    }
  };

  return (
    <Card
      disabled={disabled}
      className={className}
      size='m'
      data-layout-type={layoutType}
      data-test-id={dataTestId}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      {...extractSupportProps(rest)}
    >
      <div className={styles.wrapper}>
        <Icon icon={icon} size='m' data-test-id={`${dataTestId}__icon`} decor />

        <div className={styles.content}>
          <Title data-test-id={`${dataTestId}__title`} className={styles.title}>
            {href ? (
              <a
                tabIndex={-1}
                ref={ref}
                href={href}
                target={target}
                onClick={handleLinkClick}
                data-test-id={`${dataTestId}__title-link`}
              >
                {title}
              </a>
            ) : (
              title
            )}
          </Title>

          {description && (
            <Typography.SansBodyM data-test-id={`${dataTestId}__description`} className={styles.description}>
              {description}
            </Typography.SansBodyM>
          )}

          {tags && tags.length > 0 && (
            <div className={styles.tagList}>
              {tags.map(({ type }, index) => (
                <TagPredefined
                  data-test-id={`${dataTestId}__tag-${index + 1}`}
                  type={type}
                  variant='promo'
                  key={index}
                  size='xs'
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
