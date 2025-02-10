import cn from 'classnames';
import debounce from 'lodash.debounce';
import { useEffect, useMemo, useRef, useState } from 'react';

import { Layout } from '@sbercloud/uikit-product-site-layout';
import { extractSupportProps, WithLayoutType, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { Carousel } from '@snack-uikit/carousel';
import { Typography } from '@snack-uikit/typography';

import { SECTION_COLORS } from '../../constants';
import { CardLeading, CardLeadingItem, SectionTitle, SectionTitleProps } from '../../helperComponents';
import { SectionColor } from '../../types';
import styles from './styles.module.scss';
import { calculateAmountOfItemsPerPage } from './utils';

export type SectionLeadingProps = WithSupportProps<
  WithLayoutType<
    Pick<SectionTitleProps, 'title' | 'description' | 'titleSectionSize' | 'titleTag'> & {
      /** Массив айтемов */
      items: CardLeadingItem[];
      /** Описание секции */
      footerDescription?: string;
      /** Цвет фона */
      backgroundColor?: SectionColor;
      /** CSS - класснейм */
      className?: string;
    }
  >
>;

const MOBILE_LAYOUTS = ['tablet', 'mobile'];

export function SectionLeading({
  title,
  description,
  titleSectionSize = 'm',
  titleTag,
  items,
  footerDescription,
  backgroundColor = SECTION_COLORS.NeutralBackground1Level,
  className,
  layoutType,
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
    <Layout.SectionWrapper
      layoutType={layoutType}
      className={cn(className, styles.wrapper)}
      data-section-background={backgroundColor}
      {...extractSupportProps(rest)}
    >
      <div ref={wrapperRef} className={styles.leadingSection} data-layout-type={layoutType}>
        <SectionTitle
          layoutType={layoutType}
          title={title}
          description={description}
          titleSectionSize={titleSectionSize}
          titleTag={titleTag}
        />

        {itemsPerPageAmount > 0 && (
          <Carousel
            state={{ page: currentPage, onChange: setCurrentPage }}
            arrows={showArrows}
            showItems={itemsPerPageAmount}
            pagination={items.length > itemsPerPageAmount}
            swipe={items.length > itemsPerPageAmount}
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
    </Layout.SectionWrapper>
  );
}
