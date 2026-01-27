import { CSS_BREAKPOINTS, WithLayoutType } from '@cloud-ru/uikit-product-utils';

import styles from './styles.module.scss';

export type HeroSlideImageBgProps = {
  /** Ссылки на картинку-фон */
  source: {
    desktop: string;
    tablet: string;
    mobile: string;
  };
};

export function HeroSlideImageBg({ source }: WithLayoutType<HeroSlideImageBgProps>) {
  return (
    <picture className={styles.backgroundImageWrapper}>
      <source srcSet={source.mobile} media={CSS_BREAKPOINTS.mobile} />
      <source srcSet={source.tablet} media={CSS_BREAKPOINTS.tablet} />
      <source srcSet={source.desktop} media={CSS_BREAKPOINTS.large} />
      <img loading='lazy' src={source.desktop} className={styles.backgroundImage} alt='background' />
    </picture>
  );
}
