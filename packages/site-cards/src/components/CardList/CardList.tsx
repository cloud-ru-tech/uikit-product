import cn from 'classnames';
import { AnchorHTMLAttributes, MouseEvent } from 'react';

import { TagSpecial, TagSpecialProps } from '@cloud-ru/uikit-product-site-tag';
import { extractSupportProps, WithLayoutType, WithSupportProps } from '@cloud-ru/uikit-product-utils';
import { TruncateString } from '@snack-uikit/truncate-string';
import { Typography } from '@snack-uikit/typography';

import styles from './styles.module.scss';
import { getTitleTruncateMaxLines, getTitleTypographyProps } from './utils';

export type CardListProps = WithSupportProps<
  WithLayoutType<{
    /** Изображение */
    img: string;
    /** Теги */
    tags: Omit<TagSpecialProps, 'size' | 'className'>[];
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
  'data-test-id': dataTestId = 'card-list',
  ...rest
}: CardListProps) {
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
            <TagSpecial {...tag} key={idx} />
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
