import { ReactNode, useMemo } from 'react';

import { useLocale } from '@cloud-ru/uikit-product-locale';
import { AdaptiveCarousel, CarouselProps } from '@cloud-ru/uikit-product-mobile-carousel';
import { extractSupportProps, WithLayoutType, WithSupportProps } from '@cloud-ru/uikit-product-utils';
import { Typography } from '@snack-uikit/typography';

import { COLUMN_SIZE, MOBILE_COLUMN_SIZE, MOBILE_ROW_SIZE, ROW_SIZE } from './constants';
import styles from './styles.module.scss';
import { getLoadingCards } from './utils/getLoadingCards';
import { getProductColumns } from './utils/getProductColumns';

export type ProductsWidgetProps = WithLayoutType<
  Pick<CarouselProps, 'arrows' | 'pagination'> &
    WithSupportProps<{
      loading?: boolean;
      cards: ReactNode[];
      columnSize?: number;
      rowSize?: number;
    }>
>;

export function ProductsWidget({
  layoutType,
  cards = [],
  loading = false,
  columnSize: columnSizeProp = COLUMN_SIZE,
  rowSize: rowSizeProp = ROW_SIZE,
  arrows = true,
  pagination = true,
  ...rest
}: ProductsWidgetProps) {
  const { t } = useLocale('Widget');
  const isMobile = layoutType === 'mobile';
  const columnSize = isMobile ? MOBILE_COLUMN_SIZE : columnSizeProp;
  const rowSize = isMobile ? MOBILE_ROW_SIZE : rowSizeProp;

  const productsCards = useMemo(
    () => (loading ? getLoadingCards({ columnSize, rowSize }) : getProductColumns({ cards, columnSize, rowSize })),
    [columnSize, loading, cards, rowSize],
  );

  return (
    <div className={styles.wrapper} {...extractSupportProps(rest)}>
      <div className={styles.headerWrapper}>
        <Typography.SansTitleL tag='h5'>{t('Products.title')}</Typography.SansTitleL>
      </div>

      <AdaptiveCarousel
        layoutType={layoutType}
        gap='8px'
        infiniteScroll={!isMobile}
        swipe={false}
        showItems={rowSize}
        arrows={arrows}
        pagination={pagination}
      >
        {productsCards.map((d, index) => (
          <div className={styles.column} key={index}>
            {d}
          </div>
        ))}
      </AdaptiveCarousel>
    </div>
  );
}
