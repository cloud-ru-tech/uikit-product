import { AnchorHTMLAttributes } from 'react';

import { TagSpecial, TagSpecialProps } from '@sbercloud/uikit-product-site-tag';
import { extractSupportProps, WithLayoutType, WithSupportProps } from '@sbercloud/uikit-product-utils';
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
    icon: IconProps['icon'];
    href?: string;
    target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
    disabled?: boolean;
    onClick?: CardProps['onClick'];
    tags?: TagSpecialProps[];
    className?: string;
    outline?: boolean;
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
      {...extractSupportProps(rest)}
    >
      <div className={styles.wrapper}>
        <Icon icon={icon} size='m' data-test-id={`${dataTestId}__icon`} decor />

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
