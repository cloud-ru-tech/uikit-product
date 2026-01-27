import { AnchorHTMLAttributes } from 'react';

import { ArrowLinksSVG } from '@cloud-ru/uikit-product-icons';
import { TagSpecial, TagSpecialProps } from '@cloud-ru/uikit-product-site-tag';
import { extractSupportProps, WithLayoutType, WithSupportProps } from '@cloud-ru/uikit-product-utils';
import { ButtonFunction } from '@snack-uikit/button';
import { Card, CardProps } from '@snack-uikit/card';
import { TruncateString } from '@snack-uikit/truncate-string';

import { Icon, IconProps } from '../../helperComponents/Icon';
import { useCardInteractions } from '../../hooks';
import { MapLayoutToTitleTypography } from './constants';
import styles from './styles.module.scss';

export type CardProductProps = WithSupportProps<
  WithLayoutType<{
    title: string;
    description?: string;
    showIcon?: boolean;
    icon?: IconProps['icon'];
    href?: string;
    target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
    disabled?: boolean;
    onClick?: CardProps['onClick'];
    tags?: TagSpecialProps[];
    className?: string;
    outline?: boolean;
    showBadge?: boolean;
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
  outline,
  showIcon = true,
  showBadge = false,
  'data-test-id': dataTestId = 'card-product',
  ...rest
}: CardProductProps) {
  const Title = MapLayoutToTitleTypography[layoutType];

  const { anchorRef, handleCardKeyDown, handleCardClick, handleLinkClick } = useCardInteractions({
    href,
    onClick,
    disabled,
  });

  return (
    <Card
      disabled={disabled}
      className={className}
      size='m'
      data-layout-type={layoutType}
      data-test-id={dataTestId}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      outline={outline}
      functionBadge={
        showBadge ? (
          <div className={styles.cardFunctionBadgeWrapper}>
            <ButtonFunction
              icon={<ArrowLinksSVG className={styles.badgeArrow} />}
              appearance='primary'
              onClick={handleCardClick}
              href={href}
              size='s'
            />
          </div>
        ) : undefined
      }
      {...extractSupportProps(rest)}
    >
      <div className={styles.wrapper}>
        {showIcon && <Icon icon={icon} size='m' data-test-id={`${dataTestId}__icon`} decor />}

        <div className={styles.content}>
          <Title data-test-id={`${dataTestId}__title`} className={styles.title}>
            {href ? (
              <a
                tabIndex={-1}
                ref={anchorRef}
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
            <TruncateString
              data-test-id={`${dataTestId}__description`}
              text={description}
              className={styles.description}
              maxLines={3}
            />
          )}

          {tags && tags.length > 0 && (
            <div className={styles.tagList}>
              {tags.map((tag, index) => (
                <TagSpecial data-test-id={`${dataTestId}__tag-${index + 1}`} key={index} {...tag} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
