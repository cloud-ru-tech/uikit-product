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
  /** Ссылка в названии */
  titleLink?: PickLinkProps<typeof Link, 'href' | 'onClick' | 'target' | 'appearance' | 'textMode'>;
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
  titleLink,
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
              {titleLink ? <Link {...titleLink} {...titleProps} text={title} /> : <RichText richText={title} />}
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
