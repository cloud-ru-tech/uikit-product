import cn from 'classnames';
import { useState } from 'react';

import { extractSupportProps, WithLayoutType, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { Carousel, CarouselProps } from '@snack-uikit/carousel';

import { Control, HeroSlide, HeroSlideProps, TabsRowHeroSlider } from './components';
import { TabHeroSliderBase } from './components/TabHeroSlider';
import styles from './styles.module.scss';

export type HeroSliderProps = WithSupportProps<
  WithLayoutType<
    {
      id?: string;
      /** Слайды карусели */
      items: HeroSlideProps[];
      /** Заголовки для tabs */
      tabs: TabHeroSliderBase[];
      /** CSS-класс */
      className?: string;
    } & Pick<CarouselProps, 'state'>
  >
>;

const AUTO_SWIPE: CarouselProps['autoSwipe'] = 5;
const AUTO_SWIPE_DISABLED: CarouselProps['autoSwipe'] = 0;

export function HeroSlider({ id, tabs: tabsProp, layoutType, items: itemsProp, className, ...rest }: HeroSliderProps) {
  // Максимум 5 слайдов
  const items = itemsProp.toSpliced(5);
  const tabs = tabsProp.toSpliced(5);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [autoSwipe, setAutoSwipe] = useState(AUTO_SWIPE);

  const currentAppearance = items[currentPage].appearance;
  const currentColor = items[currentPage].color;

  const currentTab = tabs[currentPage];

  const handleTabClick = (tab: TabHeroSliderBase) => {
    const currentIndex = tabs.findIndex(t => t.title === tab.title);

    setCurrentPage(currentIndex);
    setAutoSwipe(AUTO_SWIPE_DISABLED);
  };

  const handleLeftClick = () => {
    setCurrentPage(page => (items.length + page - 1) % items.length);
    setAutoSwipe(AUTO_SWIPE_DISABLED);
  };
  const handleRightClick = () => {
    setCurrentPage(page => (page + 1) % items.length);
    setAutoSwipe(AUTO_SWIPE_DISABLED);
  };

  return (
    <section
      className={cn(styles.root, className)}
      id={id}
      data-appearance={currentAppearance}
      data-color={currentColor}
      data-layout-type={layoutType}
    >
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
        gap='0'
        {...extractSupportProps(rest)}
      >
        {items.map((item, i) => (
          <div key={`${item.title}${i}`} className={styles.carouselItemWrapper} data-layout-type={layoutType}>
            <HeroSlide {...item} className={styles.heroSlide} layoutType={layoutType} />
          </div>
        ))}
      </Carousel>
      <div className={cn(styles.tabsWrapper)} data-layout-type={layoutType}>
        <TabsRowHeroSlider
          className={styles.tabs}
          appearance={currentAppearance}
          active={currentTab}
          items={tabs}
          animationEnabled={autoSwipe === AUTO_SWIPE}
          onTabClick={handleTabClick}
        />
      </div>
      <Control className={styles.control} variant='prev' onClick={handleLeftClick} />
      <Control className={styles.control} variant='next' onClick={handleRightClick} />
    </section>
  );
}
