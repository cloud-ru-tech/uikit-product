import { useMemo } from 'react';

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
}>;

export function SectionTitle({
  title,
  description,
  titleSectionSize = 'm',
  titleTag = 'h2',
  layoutType,
}: SectionTitleProps) {
  const titleProps = useMemo(
    () => getTitleTypographyProps({ titleSectionSize, layoutType }),
    [layoutType, titleSectionSize],
  );

  return (
    <>
      {(title || description) && (
        <div className={styles.sectionTitle}>
          {title && (
            <Typography family='sans' {...titleProps} tag={titleTag} className={styles.title}>
              {title}
            </Typography>
          )}
          {description && <Typography.SansBodyL className={styles.description}>{description}</Typography.SansBodyL>}
        </div>
      )}
    </>
  );
}
