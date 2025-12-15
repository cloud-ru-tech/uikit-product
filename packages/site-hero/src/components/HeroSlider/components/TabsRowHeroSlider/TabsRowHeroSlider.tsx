import cn from 'classnames';
import { useEffect, useRef } from 'react';

import { AppearanceType } from '../HeroSlide/types';
import { TabHeroSlider, TabHeroSliderBase } from '../TabHeroSlider';
import styles from './styles.module.scss';

type TabsRowHeroSliderProps = {
  className?: string;
  appearance: AppearanceType;
  active: TabHeroSliderBase;
  items: TabHeroSliderBase[];
  animationEnabled: boolean;
  onTabClick: (page: TabHeroSliderBase) => void;
};

export function TabsRowHeroSlider(props: TabsRowHeroSliderProps) {
  const { className, items, appearance, active, animationEnabled, onTabClick } = props;

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const activeTabElement = container.querySelector<HTMLElement>('[data-active="true"]');

    if (activeTabElement) {
      const containerWidth = container.clientWidth;
      const tabWidth = activeTabElement.offsetWidth;
      const tabOffsetLeft = activeTabElement.offsetLeft;

      const targetScrollLeft = tabOffsetLeft - containerWidth / 2 + tabWidth / 2;

      container.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth',
      });
    }
  }, [active]);

  const handleTabClick = (tab: TabHeroSliderBase) => () => {
    onTabClick(tab);
  };

  return (
    <div className={cn(styles.tabs, className)} ref={containerRef}>
      {items.map((tab, i) => (
        <TabHeroSlider
          key={`tab-${i}-${tab.title}`}
          appearance={appearance}
          active={tab === active}
          animationEnabled={animationEnabled}
          onClick={handleTabClick(tab)}
          {...tab}
        />
      ))}
    </div>
  );
}
