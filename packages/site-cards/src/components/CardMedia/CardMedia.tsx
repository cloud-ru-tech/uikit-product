import { AnchorHTMLAttributes, MouseEvent } from 'react';

import { WatchSVG } from '@cloud-ru/uikit-product-icons';
import { extractSupportProps, WithLayoutType, WithSupportProps } from '@cloud-ru/uikit-product-utils';
import { Tag, TagProps } from '@snack-uikit/tag';
import { TruncateString } from '@snack-uikit/truncate-string';
import { Typography } from '@snack-uikit/typography';

import { useCardInteractions } from '../../hooks';
import styles from './styles.module.scss';
import { TitleTag } from './types';
import { getTypographySize } from './utils';

export type CardMediaProps = WithSupportProps<
  WithLayoutType<{
    /** Заголовок карточки*/
    title: string;
    /** Тег заголовка */
    titleTag: TitleTag;
    /** Размер карточки */
    size: 's' | 'm' | 'l';
    /** Ссылка на картинку */
    img: string;
    /** Описание для картинки */
    imgAlt?: string;
    /** Тег */
    tag: Pick<TagProps, 'label' | 'appearance'>;
    /** Время чтения */
    time?: string;
    /** Дата публикации */
    date: string;
    /** Ссылка */
    href: string;
    /** HTML-аттрибут target */
    target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
    /** Колбек клика*/
    onClick?(e?: MouseEvent<HTMLDivElement | HTMLAnchorElement>): void;
    /**
     * Является ли деактивированным
     * @default false
     */
    disabled?: boolean;
  }>
>;

export function CardMedia({
  title,
  titleTag = 'h2',
  size = 's',
  img,
  imgAlt,
  tag,
  time,
  href,
  disabled,
  date,
  target = '_self',
  onClick,
  'data-test-id': dataTestId = 'card-media',
  layoutType,
  ...rest
}: CardMediaProps) {
  const { anchorRef, handleLinkClick, handleCardKeyDown } = useCardInteractions({
    href,
    disabled,
    onClick,
  });

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      {...extractSupportProps(rest)}
      onKeyDown={handleCardKeyDown}
      data-test-id={dataTestId}
      data-size={size}
      className={styles.root}
      data-disabled={disabled || undefined}
      data-layout-type={layoutType}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
    >
      <div className={styles.imgWrapper}>
        <img className={styles.img} src={img} alt={imgAlt ?? 'card-media-img'} />
      </div>

      <div className={styles.header}>
        <div className={styles.left}>
          <Tag size='xs' {...tag} />

          {time && (
            <span className={styles.time}>
              <WatchSVG className={styles.icon} size={16} />
              <Typography.SansBodyM className={styles.minutes}>{`${time} мин`}</Typography.SansBodyM>
            </span>
          )}
        </div>

        {size !== 's' && <Typography.SansBodyM className={styles.date}>{date}</Typography.SansBodyM>}
      </div>

      <Typography
        tag={titleTag}
        family='sans'
        purpose='title'
        size={getTypographySize(layoutType, size)}
        className={styles.title}
        data-test-id={`${dataTestId}__title`}
      >
        {href ? (
          <a
            tabIndex={-1}
            ref={anchorRef}
            href={href}
            target={target}
            onClick={handleLinkClick}
            data-test-id={`${dataTestId}__title-link`}
          >
            <TruncateString text={title} maxLines={4} />
          </a>
        ) : (
          title
        )}
      </Typography>
    </div>
  );
}
