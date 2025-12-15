import { RichText } from '@sbercloud/uikit-product-site-rich-text';
import { Typography } from '@snack-uikit/typography';

import { AppearanceType } from '../HeroSlide/types';
import styles from './styles.module.scss';

export type TabHeroSliderBase = {
  title: string;
};

type TabHeroSliderProps = TabHeroSliderBase & {
  active: boolean;
  appearance: AppearanceType;
  animationEnabled: boolean;
  onClick: () => void;
};

export function TabHeroSlider(props: TabHeroSliderProps) {
  const { title, appearance, active, animationEnabled, onClick } = props;

  return (
    <button
      className={styles.tab}
      type='button'
      role='tab'
      onClick={onClick}
      data-appearance={appearance}
      data-active={active}
    >
      <Typography.SansBodyS>
        <RichText richText={title} />
      </Typography.SansBodyS>
      {active && <div className={styles.timeline} data-animation-enabled={animationEnabled} />}
    </button>
  );
}
