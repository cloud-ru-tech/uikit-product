import cn from 'classnames';
import debounce from 'lodash.debounce';
import { useEffect, useMemo, useRef, useState } from 'react';

import { Layout } from '@sbercloud/uikit-product-site-layout';
import { extractSupportProps, WithLayoutType, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { Carousel } from '@snack-uikit/carousel';

import { SECTION_COLORS } from '../../constants';
import { Expert, SectionTitle, SectionTitleProps } from '../../helperComponents';
import { SectionColor } from '../../types';
import styles from './styles.module.scss';
import { ExpertDetails } from './types';
import { calculateAmountOfItemsPerPage } from './utils';

export type SectionExpertsProps = WithSupportProps<
  WithLayoutType<
    Pick<SectionTitleProps, 'title' | 'titleTag'> & {
      /** id секции */
      id?: string;
      /** Массив айтемов */
      items: ExpertDetails[];
      /** Цвет фона */
      backgroundColor?: SectionColor;
      /** CSS - класснейм */
      className?: string;
    }
  >
>;

const MOBILE_LAYOUTS = ['tablet', 'mobile'];

export function SectionExperts({
  id,
  title,
  titleTag,
  items,
  backgroundColor = SECTION_COLORS.NeutralBackground1Level,
  className,
  layoutType,
  ...rest
}: SectionExpertsProps) {
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
    <Layout.SectionWrapper
      id={id}
      layoutType={layoutType}
      className={cn(className, styles.wrapper)}
      data-section-background={backgroundColor}
      {...extractSupportProps(rest)}
    >
      <div ref={wrapperRef} className={styles.siteSectionExperts} data-layout-type={layoutType}>
        <SectionTitle layoutType={layoutType} title={title} titleTag={titleTag} />

        {itemsPerPageAmount > 0 && (
          <Carousel
            state={{ page: currentPage, onChange: setCurrentPage }}
            arrows={showArrows}
            showItems={itemsPerPageAmount}
            pagination={items.length > itemsPerPageAmount}
            swipe={items.length > itemsPerPageAmount}
          >
            {items.map(item => (
              <Expert key={item.name} {...item} />
            ))}
          </Carousel>
        )}
      </div>
    </Layout.SectionWrapper>
  );
}
