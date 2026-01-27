import cn from 'classnames';
import { useMemo, useState } from 'react';

import { extractSupportProps } from '@cloud-ru/uikit-product-utils';
import { CarouselProps } from '@snack-uikit/carousel';
import { PaginationSlider } from '@snack-uikit/pagination';

import { TEST_IDS } from '../../testIds';
import { ItemList } from './components';
import styles from './styles.module.scss';

export type MobileCarouselProps = Omit<
  CarouselProps,
  'transition' | 'swipe' | 'swipeActivateLength' | 'arrows' | 'state'
>;

const noop = () => {};

export function MobileCarousel({
  children: items,
  showItems = 1.1,
  scrollBy: scrollByProp,
  className,
  gap,
  pagination,
  infiniteScroll = false,
  autoSwipe,
  ...rest
}: MobileCarouselProps) {
  const scrollBy = useMemo(() => scrollByProp ?? Math.trunc(showItems), [showItems, scrollByProp]);
  const [page, setPage] = useState(0);

  const total = useMemo(() => {
    if (items.length <= showItems) {
      return 1;
    }
    return 1 + Math.ceil((items.length - showItems) / scrollBy);
  }, [items.length, scrollBy, showItems]);

  return (
    <div className={cn(styles.carousel, className)} {...extractSupportProps(rest)}>
      <div className={styles.carouselBase}>
        <ItemList
          showItems={showItems}
          scrollBy={scrollBy}
          items={items}
          gap={gap}
          autoSwipe={autoSwipe}
          infiniteScroll={infiniteScroll}
          totalPages={total}
          onPageChange={setPage}
        />
      </div>

      {pagination && (
        <div className={styles.pagination}>
          <PaginationSlider data-test-id={TEST_IDS.pagination} page={page + 1} onChange={noop} total={total} />
        </div>
      )}
    </div>
  );
}
