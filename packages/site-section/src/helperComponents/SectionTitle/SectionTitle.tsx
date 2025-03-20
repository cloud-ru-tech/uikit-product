import { useMemo } from 'react';

import { RichText } from '@sbercloud/uikit-product-site-rich-text';
import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { Typography } from '@snack-uikit/typography';

import styles from './styles.module.scss';
import { SectionTag, Size } from './types';
import { getTitleTypographyProps } from './utils';

export type SectionTitleProps = WithLayoutType<{
  /** Название секции */
  title?: string;
  /** Описание секции */
  description?: string;
  /** Размер шрифтов заголовка и подзаголовка */
  titleSectionSize?: Size;
  /** Тег заголовка */
  titleTag?: SectionTag;
  /** Выравнивание текста */
  titleAlign?: 'left' | 'center';
}>;

export function SectionTitle({
  title,
  description,
  titleSectionSize = 'm',
  titleTag = 'h2',
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
          {title && (
            <Typography family='sans' {...titleProps} tag={titleTag} className={styles.title}>
              <RichText richText={title} />
            </Typography>
          )}
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
