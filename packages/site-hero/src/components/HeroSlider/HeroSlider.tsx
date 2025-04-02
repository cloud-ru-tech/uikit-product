import cn from 'classnames';
import { useState } from 'react';

import { extractSupportProps, WithLayoutType, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { Carousel, CarouselProps } from '@snack-uikit/carousel';
import { PaginationSlider } from '@snack-uikit/pagination';

import { HeroSlide, HeroSlideProps } from './components';
import styles from './styles.module.scss';

export type HeroSliderProps = WithSupportProps<
  WithLayoutType<
    {
      id?: string;
      /** Слайды карусели */
      items: HeroSlideProps[];
      /** CSS-класс */
      className?: string;
      /** Использовать пагинацию для переключения страниц @default true */
      pagination?: boolean;
    } & Pick<CarouselProps, 'state' | 'autoSwipe'>
  >
>;

export function HeroSlider({
  id,
  layoutType,
  items,
  autoSwipe,
  pagination = true,
  className,
  ...rest
}: HeroSliderProps) {
  const [currentPage, setCurrentPage] = useState<number>(0);

  const currentSlideAppearance = items[currentPage].appearance;

  return (
    <section className={cn(styles.root, className)} id={id}>
      <Carousel
        className={styles.heroCarousel}
        arrows={false}
        pagination={false}
        infiniteScroll
        autoSwipe={autoSwipe}
        state={{
          page: currentPage,
          onChange: setCurrentPage,
        }}
        gap={'0'}
        {...extractSupportProps(rest)}
      >
        {items.map((item, i) => (
          <HeroSlide key={`${item.title}${i}`} {...item} layoutType={layoutType} />
        ))}
      </Carousel>

      {pagination && (
        <div className={styles.paginationWrapper} data-appearance={currentSlideAppearance}>
          <PaginationSlider
            data-test-id='hero-slider__pagination'
            page={currentPage + 1}
            onChange={(page: number) => {
              setCurrentPage(page - 1);
            }}
            total={items.length}
          />
        </div>
      )}
    </section>
  );
}
