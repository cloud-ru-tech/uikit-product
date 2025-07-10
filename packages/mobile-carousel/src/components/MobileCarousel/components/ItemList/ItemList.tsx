import debounce from 'lodash.debounce';
import { ReactElement, UIEventHandler, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { TEST_IDS } from '../../../../testIds';
import styles from './styles.module.scss';

export type ItemProviderProps = {
  items: ReactElement[];
  showItems: number;
  scrollBy: number;
  gap?: string;
  autoSwipe?: number;
  infiniteScroll?: boolean;
  totalPages: number;
  onPageChange(page: number): void;
};

const DELTA = 5;

export function ItemList({
  items,
  showItems,
  scrollBy,
  gap,
  autoSwipe,
  infiniteScroll,
  totalPages,
  onPageChange,
}: ItemProviderProps) {
  const timerRef = useRef<NodeJS.Timeout>();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [computedValues, setComputedValues] = useState({ itemWidth: 0, gap: 0 });
  const [canDoInfiniteScroll, setCanDoInfiniteScroll] = useState(true);

  const recalculateItemsSize = useCallback(() => {
    const containerElement = containerRef.current;

    if (!containerElement) {
      return;
    }

    const styles = getComputedStyle(containerElement);

    const gap = Number.parseFloat(styles.getPropertyValue('--mobile-carousel--list-gap'));
    const paddingLeft = Number.parseFloat(styles.getPropertyValue('padding-left'));
    const paddingRight = Number.parseFloat(styles.getPropertyValue('padding-right'));

    const itemWidth =
      (containerElement.getBoundingClientRect().width -
        (Math.trunc(showItems) - 1) * gap -
        paddingLeft -
        paddingRight) /
      showItems;
    setComputedValues({ itemWidth, gap });
  }, [showItems]);

  useEffect(() => {
    const node = containerRef.current;

    if (!node) {
      return;
    }

    recalculateItemsSize();

    const observer = new ResizeObserver(debounce(recalculateItemsSize, 100));
    observer.observe(node);
    return () => observer.disconnect();
  }, [recalculateItemsSize]);

  const itemWidth = useMemo(() => {
    if (computedValues.itemWidth > 0) {
      return computedValues.itemWidth;
    }

    const fallbackWidth = Math.floor(100 / showItems);
    return `${fallbackWidth}%`;
  }, [computedValues.itemWidth, showItems]);

  useEffect(() => {
    if (!autoSwipe) {
      return;
    }

    const handleAutoSwipe = () => {
      const deltaWidth = computedValues.itemWidth * scrollBy;

      if (containerRef.current) {
        const newLeft = containerRef.current.scrollLeft + deltaWidth;

        containerRef.current.scrollTo({
          left: newLeft > containerRef.current.scrollWidth - deltaWidth ? 0 : newLeft,
          behavior: 'smooth',
        });
      }
    };

    timerRef.current = setInterval(() => handleAutoSwipe(), autoSwipe * 1000);

    return () => clearInterval(timerRef.current);
  }, [autoSwipe, computedValues.itemWidth, scrollBy, scrollLeft]);

  const handleScroll: UIEventHandler<HTMLDivElement> = event => {
    const newScrollLeft = event.currentTarget.scrollLeft;
    setScrollLeft(newScrollLeft);

    const newPage = Number(Math.floor(newScrollLeft / (computedValues.itemWidth * scrollBy)));
    onPageChange(Math.max(0, Math.min(totalPages - 1, newPage)));
  };

  const isScrolledLeft = () => Boolean(containerRef.current && containerRef.current.scrollLeft <= DELTA);
  const isScrolledRight = () =>
    Boolean(
      containerRef.current &&
        containerRef.current.scrollWidth - containerRef.current.scrollLeft - containerRef.current.offsetWidth <= DELTA,
    );

  const handleTouchStart = () => {
    setCanDoInfiniteScroll(isScrolledLeft() || isScrolledRight());
  };

  const handleTouchEnd = () => {
    const scrollArea = containerRef.current;

    if (!canDoInfiniteScroll || !infiniteScroll || !scrollArea) {
      return;
    }

    if (isScrolledLeft()) {
      scrollArea.scrollTo({ left: scrollArea.scrollWidth, behavior: 'smooth' });
    } else if (isScrolledRight()) {
      scrollArea.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={containerRef}
      className={styles.itemList}
      data-gap={gap}
      style={{ ...(gap ? { '--mobile-carousel--list-gap': gap } : {}) }}
      onScroll={handleScroll}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {items.map((item, i) => (
        <div
          key={i}
          style={{ width: itemWidth }}
          className={styles.itemContainer}
          role='group'
          data-test-id={TEST_IDS.trackItem}
        >
          {item}
        </div>
      ))}
    </div>
  );
}
