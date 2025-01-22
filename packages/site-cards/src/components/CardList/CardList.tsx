import cn from 'classnames';
import { AnchorHTMLAttributes, MouseEvent } from 'react';

import { extractSupportProps, WithLayoutType, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { PromoTag, PromoTagProps } from '@snack-uikit/promo-tag';
import { TruncateString } from '@snack-uikit/truncate-string';
import { Typography } from '@snack-uikit/typography';

import styles from './styles.module.scss';
import { getTitleTruncateMaxLines, getTitleTypographyProps } from './utils';

export type CardListProps = WithSupportProps<
  WithLayoutType<{
    /** Изображение */
    img: string;
    /** Теги */
    tags: Omit<PromoTagProps, 'size' | 'className'>[];
    /** Ссылка */
    href: string;
    /** HTML-аттрибут target */
    target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
    /** Колбек клика*/
    onClick?(e: MouseEvent<HTMLAnchorElement>): void;
    /**
     * Является ли деактивированным
     * @default false
     */
    disabled?: boolean;
    /** CSS-класс */
    className?: string;
    /** Заголовок */
    title: string;
    /** Дата */
    labelDate?: string;
  }>
>;

export function CardList({
  disabled,
  layoutType,
  img,
  title,
  className,
  labelDate,
  href,
  onClick,
  tags,
  target,
  ...rest
}: CardListProps) {
  const dataTestId = rest['data-test-id'];

  return (
    <a
      {...extractSupportProps(rest)}
      href={href}
      target={target}
      className={cn(styles.wrapper, className)}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : 0}
      onClick={disabled ? undefined : onClick}
      data-layout-type={layoutType}
    >
      <div className={styles.imgWrapper} data-test-id={`${dataTestId}-imgWrapper`}>
        <img className={styles.img} src={img} alt='card_img' data-test-id={`${dataTestId}-img`} />
      </div>

      <div className={styles.content}>
        <div className={styles.tagRow}>
          {tags.map((tag, idx) => (
            <PromoTag {...tag} key={idx} size='xs' color='decor' />
          ))}
        </div>

        <Typography className={styles.title} tag='h3' family='sans' {...getTitleTypographyProps({ layoutType })}>
          <TruncateString
            text={title}
            maxLines={getTitleTruncateMaxLines({ layoutType })}
            data-test-id={`${dataTestId}-title`}
          />
        </Typography>

        {labelDate && (
          <Typography.SansBodyS className={styles.labelDate} data-test-id={`${dataTestId}-time`}>
            {labelDate}
          </Typography.SansBodyS>
        )}
      </div>
    </a>
  );
}
