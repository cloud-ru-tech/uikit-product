import cn from 'classnames';
import { AnchorHTMLAttributes, MouseEvent } from 'react';

import { TagSpecial, TagSpecialProps } from '@sbercloud/uikit-product-site-tag';
import { extractSupportProps, WithLayoutType, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { Card } from '@snack-uikit/card';
import { TruncateString } from '@snack-uikit/truncate-string';
import { Typography } from '@snack-uikit/typography';

import { useCardInteractions } from '../../hooks';
import { getTypographySize } from '../utils';
import styles from './styles.module.scss';

export type CardMarketplaceProps = WithSupportProps<
  WithLayoutType<{
    /** Заголовок карточки*/
    title: string;
    /** Описание карточки */
    description?: string;
    /** Ссылка */
    href: string;
    /** HTML-аттрибут target */
    target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
    /** Колбек клика*/
    onClick?(e?: MouseEvent<HTMLDivElement | HTMLAnchorElement>): void;
    /** Ссылка на изображение */
    logo: {
      src: string;
      alt?: string;
    };
    /** Тег */
    tag?: Omit<TagSpecialProps, 'className'>;
    /**
     * Является ли деактивированным
     * @default false
     */
    disabled?: boolean;
    /** CSS-класс */
    className?: string;
  }>
>;

export function CardMarketplace({
  title,
  description,
  logo,
  href,
  target = '_blank',
  onClick,
  tag,
  disabled = false,
  className,
  layoutType,
  'data-test-id': dataTestId = 'card-marketplace',
  ...rest
}: CardMarketplaceProps) {
  const { anchorRef, handleCardKeyDown, handleCardClick, handleLinkClick } = useCardInteractions({
    href,
    onClick,
    disabled,
  });

  return (
    <Card
      {...extractSupportProps(rest)}
      size='m'
      className={cn(styles.card, className)}
      disabled={disabled}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      data-test-id={dataTestId}
      outline
    >
      <div data-layout-type={layoutType} className={styles.wrapper}>
        <img alt={logo.alt ?? title} data-test-id={`${dataTestId}__logo`} src={logo.src} className={styles.logo} />

        <div className={styles.content}>
          <Typography
            tag='h3'
            family='sans'
            purpose='title'
            size={getTypographySize(layoutType)}
            className={styles.title}
            data-test-id={`${dataTestId}__title`}
          >
            <a
              tabIndex={-1}
              ref={anchorRef}
              href={href}
              target={target}
              onClick={handleLinkClick}
              data-test-id={`${dataTestId}__title-link`}
            >
              <TruncateString text={title} maxLines={2} />
            </a>
          </Typography>

          {description && (
            <TruncateString
              className={styles.description}
              text={description}
              maxLines={4}
              data-test-id={`${dataTestId}__description`}
            />
          )}
        </div>

        {tag && <TagSpecial data-test-id={`${dataTestId}__tag`} className={styles.tag} {...tag} />}
      </div>
    </Card>
  );
}
