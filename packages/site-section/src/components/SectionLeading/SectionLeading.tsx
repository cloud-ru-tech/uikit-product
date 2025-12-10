import debounce from 'lodash.debounce';
import { useEffect, useMemo, useRef, useState } from 'react';

import { extractSupportProps, WithLayoutType, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { Carousel, CarouselProps } from '@snack-uikit/carousel';
import { Typography } from '@snack-uikit/typography';

import { CardLeading, CardLeadingItem } from '../../helperComponents';
import { SectionBasic, SectionBasicProps } from '../SectionBasic';
import styles from './styles.module.scss';
import { calculateAmountOfItemsPerPage } from './utils';

export type SectionLeadingProps = WithSupportProps<
  WithLayoutType<
    Pick<SectionBasicProps, 'title' | 'description' | 'titleSectionSize' | 'titleTag' | 'backgroundColor'> &
      Pick<CarouselProps, 'autoSwipe'> & {
        /** id секции */
        id?: string;
        /** Массив айтемов */
        items: CardLeadingItem[];
        /** Описание секции */
        footerDescription?: string;
        /** CSS - класснейм */
        className?: string;
      }
  >
>;

const MOBILE_LAYOUTS = ['tablet', 'mobile'];

export function SectionLeading({
  id,
  title,
  description,
  titleSectionSize = 'm',
  titleTag,
  items,
  footerDescription,
  backgroundColor,
  className,
  layoutType,
  autoSwipe = 9,
  ...rest
}: SectionLeadingProps) {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [itemsPerPageAmount, setItemsPerPageAmount] = useState<number>(0);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) {
      return;
    }

    const calculateAmountOfItems = () => {
      const wrapperWidth = node.offsetWidth;
      if (!wrapperWidth) {
        return;
      }

      setItemsPerPageAmount(calculateAmountOfItemsPerPage(wrapperWidth));
    };

    const observer = new ResizeObserver(debounce(calculateAmountOfItems, 100));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const showArrows = useMemo(() => {
    if (MOBILE_LAYOUTS.includes(layoutType)) {
      return false;
    }

    return items.length > itemsPerPageAmount;
  }, [items.length, itemsPerPageAmount, layoutType]);

  return (
    <SectionBasic
      id={id}
      layoutType={layoutType}
      className={className}
      backgroundColor={backgroundColor}
      title={title}
      description={description}
      titleSectionSize={titleSectionSize}
      titleTag={titleTag}
      {...extractSupportProps(rest)}
    >
      <div ref={wrapperRef} className={styles.leadingSection} data-layout-type={layoutType}>
        {itemsPerPageAmount > 0 && (
          <Carousel
            state={{ page: currentPage, onChange: setCurrentPage }}
            arrows={showArrows}
            controlsVisibility='always'
            showItems={itemsPerPageAmount}
            pagination={items.length > itemsPerPageAmount}
            swipe={items.length > itemsPerPageAmount}
            autoSwipe={autoSwipe}
            infiniteScroll
            gap='2px'
          >
            {items.map(item => (
              <CardLeading key={item.label} {...item} layoutType={layoutType} data-test-id={item['data-test-id']} />
            ))}
          </Carousel>
        )}

        {footerDescription && (
          <div className={styles.footerDescription} data-layout-type={layoutType}>
            <Typography.SansBodyL className={styles.footerDescriptionText}>{footerDescription}</Typography.SansBodyL>
          </div>
        )}
      </div>
    </SectionBasic>
  );
}
