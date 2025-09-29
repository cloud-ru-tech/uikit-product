import { useMemo } from 'react';

import { RichText } from '@sbercloud/uikit-product-site-rich-text';
import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { Link, PickLinkProps } from '@snack-uikit/link';
import { Typography } from '@snack-uikit/typography';

import styles from './styles.module.scss';
import { SectionTag, Size } from './types';
import { getTitleTypographyProps } from './utils';

export type SectionTitleProps = WithLayoutType<{
  /** Название секции */
  title?: string;
  /** Подзаголовок секции */
  subtitle?: string;
  /** Ссылка в названии */
  titleLink?: PickLinkProps<typeof Link, 'href' | 'onClick' | 'target' | 'appearance' | 'textMode'>;
  /** Описание секции */
  description?: string;
  /** Размер шрифтов заголовка и подзаголовка */
  titleSectionSize?: Size;
  /** Тег заголовка */
  titleTag?: SectionTag;
  /** Тег подзаголовка */
  subtitleTag?: SectionTag;
  /** Выравнивание текста */
  titleAlign?: 'left' | 'center';
}>;

export function SectionTitle({
  title,
  subtitle,
  titleLink,
  description,
  titleSectionSize = 'm',
  titleTag = 'h2',
  subtitleTag = 'h3',
  layoutType,
  titleAlign = 'left',
}: SectionTitleProps) {
  const titleProps = useMemo(
    () => getTitleTypographyProps({ titleSectionSize, layoutType }),
    [layoutType, titleSectionSize],
  );

  return (
    <>
      {(title || description) && (
        <div className={styles.sectionTitle} data-align={titleAlign}>
          <div className={styles.titlesWrapper} data-align={titleAlign}>
            {title && (
              <Typography family='sans' {...titleProps} tag={titleTag} className={styles.title}>
                {titleLink ? <Link {...titleLink} {...titleProps} text={title} /> : <RichText richText={title} />}
              </Typography>
            )}
            {subtitle && (
              <Typography family='sans' purpose='label' size='l' tag={subtitleTag} className={styles.subtitle}>
                <RichText richText={subtitle} />
              </Typography>
            )}
          </div>
          {description && (
            <Typography.SansBodyL className={styles.description}>
              <RichText richText={description} />
            </Typography.SansBodyL>
          )}
        </div>
      )}
    </>
  );
}
