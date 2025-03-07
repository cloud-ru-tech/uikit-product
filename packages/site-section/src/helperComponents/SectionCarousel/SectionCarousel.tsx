import cn from 'classnames';
import debounce from 'lodash.debounce';
import { useEffect, useMemo, useRef, useState } from 'react';

import { Layout } from '@sbercloud/uikit-product-site-layout';
import { extractSupportProps } from '@sbercloud/uikit-product-utils';
import { Carousel } from '@snack-uikit/carousel';

import { SECTION_COLORS } from '../../constants';
import { SectionTitle } from '../SectionTitle';
import styles from './styles.module.scss';
import { SectionCarouselProps } from './types';
import { calculateAmountOfItemsPerPage } from './utils';

const MOBILE_LAYOUTS = ['tablet', 'mobile'];

export function SectionCarousel({
  id,
  title,
  titleTag,
  titleSectionSize,
  description,
  children,
  itemMinWidth,
  maxItemsPerPage,
  backgroundColor = SECTION_COLORS.NeutralBackground1Level,
  className,
  layoutType,
  gap,
  ...rest
}: SectionCarouselProps) {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [itemsPerPageAmount, setItemsPerPageAmount] = useState<number>(0);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) {
      return;
    }

    const calculateAmountOfItems = () => {
      const wrapperWidth = wrapperRef.current?.offsetWidth;
      if (!wrapperWidth) {
        return;
      }

      setItemsPerPageAmount(
        calculateAmountOfItemsPerPage({
          wrapperWidth,
          itemMinWidth,
          maxItemsPerPage,
        }),
      );
    };

    const observer = new ResizeObserver(debounce(calculateAmountOfItems, 100));
    observer.observe(node);
    return () => observer.disconnect();
  }, [itemMinWidth, maxItemsPerPage]);

  const showArrows = useMemo(() => {
    if (MOBILE_LAYOUTS.includes(layoutType)) {
      return false;
    }

    return children.length > itemsPerPageAmount;
  }, [children.length, itemsPerPageAmount, layoutType]);

  return (
    <Layout.SectionWrapper
      id={id}
      layoutType={layoutType}
      className={cn(className, styles.wrapper)}
      data-section-background={backgroundColor}
      {...extractSupportProps(rest)}
    >
      <div ref={wrapperRef} className={styles.sectionCarousel} data-layout-type={layoutType}>
        <SectionTitle
          layoutType={layoutType}
          title={title}
          titleTag={titleTag}
          titleSectionSize={titleSectionSize}
          description={description}
        />

        {itemsPerPageAmount > 0 && (
          <Carousel
            state={{ page: currentPage, onChange: setCurrentPage }}
            arrows={showArrows}
            showItems={itemsPerPageAmount}
            pagination={children.length > itemsPerPageAmount}
            swipe={children.length > itemsPerPageAmount}
            gap={gap}
          >
            {children}
          </Carousel>
        )}
      </div>
    </Layout.SectionWrapper>
  );
}
