import { MouseEvent } from 'react';

import { WithLayoutType } from '@cloud-ru/uikit-product-utils';
import { Card } from '@snack-uikit/card';
import { Skeleton } from '@snack-uikit/skeleton';
import { Typography } from '@snack-uikit/typography';

import { SkeletonTextContainer } from '../../helperComponents';
import styles from './styles.module.scss';

export type CaseCardProps = WithLayoutType<{
  /** Ссылка на img логотип */
  img: string;
  /** Ссылка переход по нажатию на карточку */
  href?: string;
  /** Список категорий */
  categories?: Array<string>;
  /** Флаг показа или скрытия списка категорий */
  visibleCategories?: boolean;
  /** Описание, где выделенные слова помечаются тегом <mark></mark> */
  description: string;
  /** Состояние загрузки */
  loading?: boolean;
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
  href,
  visibleCategories = true,
  onClick,
  loading,
}: CaseCardProps) {
  const categoryTextSize = layoutType === 'desktop' || layoutType === 'desktopSmall' ? 'm' : 's';
  const descriptionTextSize = layoutType === 'mobile' ? 's' : 'm';

  return (
    <Card href={href} onClick={onClick} size={SIZE_CARD_LAYOUT_TYPE[layoutType]} className={styles.root}>
      <div className={styles.container} data-layout-type={layoutType}>
        <Skeleton loading={loading} className={styles.skeletonIcon}>
          <div>
            <img src={img} className={styles.image} alt='img' data-layout-type={layoutType} />
          </div>
        </Skeleton>
        {loading ? (
          <SkeletonTextContainer />
        ) : (
          <div className={styles.textContainer}>
            {visibleCategories && categories && (
              <div className={styles.categoryGroup}>
                {categories.map(item => (
                  <Typography
                    family='sans'
                    purpose='body'
                    size={categoryTextSize}
                    key={item}
                    className={styles.category}
                  >
                    {item}
                  </Typography>
                ))}
              </div>
            )}
            <Typography family='sans' purpose='title' size={descriptionTextSize} className={styles.description}>
              <span dangerouslySetInnerHTML={{ __html: description }} data-layout-type={layoutType}></span>
            </Typography>
          </div>
        )}
      </div>
    </Card>
  );
}
