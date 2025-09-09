import { MouseEvent } from 'react';

import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { Card } from '@snack-uikit/card';
import { Typography } from '@snack-uikit/typography';

import styles from './styles.module.scss';

export type CaseCardProps = WithLayoutType<{
  /** Ссылка на img логотип */
  img: string;
  /** Список категорий */
  categories?: Array<string>;
  /** Флаг показа или скрытия списка категорий */
  visibleCategories?: boolean;
  /** Описание, где выделенные слова помечаются тегом <mark></mark> */
  description: string;
  /** Событие клика на карточку */
  onClick?(e: MouseEvent<HTMLDivElement | HTMLAnchorElement>): void;
}>;

const SIZE_CARD_LAYOUT_TYPE = {
  mobile: 'm' as const,
  tablet: 'm' as const,
  desktop: 'l' as const,
  desktopSmall: 'l' as const,
};

export function CaseCard({
  layoutType,
  img,
  description,
  categories,
  visibleCategories = true,
  onClick,
}: CaseCardProps) {
  const categoryTextSize = layoutType === 'desktop' || layoutType === 'desktopSmall' ? 'm' : 's';
  const descriptionTextSize = layoutType === 'mobile' ? 's' : 'm';

  return (
    <Card onClick={onClick} size={SIZE_CARD_LAYOUT_TYPE[layoutType]}>
      <div className={styles.container} data-layout-type={layoutType}>
        <div>
          <img src={img} className={styles.image} alt='img' data-layout-type={layoutType} />
        </div>
        <div className={styles.textContainer}>
          {visibleCategories && categories && (
            <div className={styles.categoryGroup}>
              {categories.map(item => (
                <Typography family='sans' purpose='body' size={categoryTextSize} key={item} className={styles.category}>
                  {item}
                </Typography>
              ))}
            </div>
          )}
          <Typography family='sans' purpose='title' size={descriptionTextSize} className={styles.description}>
            <span dangerouslySetInnerHTML={{ __html: description }}></span>
          </Typography>
        </div>
      </div>
    </Card>
  );
}
