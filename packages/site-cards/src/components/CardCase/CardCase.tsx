import cn from 'classnames';
import { AnchorHTMLAttributes, KeyboardEvent, MouseEvent, useRef } from 'react';

import { RichText } from '@sbercloud/uikit-product-site-rich-text';
import { TagPredefined, TagPredefinedProps } from '@sbercloud/uikit-product-site-tag';
import { extractSupportProps, WithLayoutType, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { Card } from '@snack-uikit/card';
import { Typography } from '@snack-uikit/typography';

import { TRIGGER_CLICK_KEY_CODES } from '../../constants';
import { getTypographySize, noop } from '../utils';
import styles from './styles.module.scss';

type GetPromoTagProps<T> = T extends TagPredefinedProps & { variant: 'industry' } ? T : never;
type TagProps = Omit<GetPromoTagProps<TagPredefinedProps>, 'variant' | 'size'>;

export type CardCaseProps = WithSupportProps<
  WithLayoutType<{
    /** Заголовок карточки*/
    title: string;
    /** Описание карточки */
    description?: string;
    /** Ссылка */
    href?: string;
    /** HTML-аттрибут target */
    target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
    /** Колбек клика*/
    onClick?(e?: MouseEvent<HTMLDivElement | HTMLAnchorElement>): void;
    /** Ссылка на логотип */
    logo: {
      src: string;
      alt: string;
    };
    /** Тег */
    tags?: TagProps[];
    /**
     * Является ли деактивированным
     * @default false
     */
    disabled?: boolean;
    /** CSS-класс */
    className?: string;
  }>
>;

export function CardCase({
  title,
  description,
  logo,
  href,
  target = '_blank',
  onClick,
  tags,
  disabled = false,
  className,
  layoutType,
  ...rest
}: CardCaseProps) {
  const dataTestId = rest['data-test-id'] ?? 'card-case';

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
      {...extractSupportProps(rest)}
      size='m'
      className={cn(styles.card, className)}
      disabled={disabled}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      data-test-id={dataTestId}
    >
      <div data-layout-type={layoutType} className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.title}>
            <Typography
              tag='h3'
              family='sans'
              purpose='title'
              size={getTypographySize(layoutType)}
              className={styles.title}
              data-test-id={`${dataTestId}__title`}
            >
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
            </Typography>

            {tags && tags.length > 0 && (
              <div className={styles.tagRow}>
                {tags.map(({ type }, index) => (
                  <TagPredefined
                    data-test-id={`${dataTestId}__tag-${type}`}
                    type={type}
                    variant='industry'
                    key={index}
                    size='xs'
                  />
                ))}
              </div>
            )}
          </div>

          <img className={styles.logo} alt={logo.alt ?? title} src={logo.src} data-test-id={`${dataTestId}__logo`} />
        </div>

        {description && (
          <RichText className={styles.description} richText={description} data-test-id={`${dataTestId}__description`} />
        )}
      </div>
    </Card>
  );
}
