import { CSS_BREAKPOINTS, WithLayoutType } from '@sbercloud/uikit-product-utils';

import styles from './styles.module.scss';

export type HeroSlideImageProps = {
  /** Ссылки на картинку */
  source: {
    desktop: string;
    tablet: string;
    mobile: string;
  };
};

export function HeroSlideImage({ source, layoutType }: WithLayoutType<HeroSlideImageProps>) {
  const { desktop, tablet, mobile } = source;

  return (
    <picture className={styles.imageWrapper} data-layout-type={layoutType}>
      {mobile && <source srcSet={mobile} media={CSS_BREAKPOINTS.mobile} />}
      {tablet && <source srcSet={tablet} media={CSS_BREAKPOINTS.tablet} />}
      <source srcSet={desktop} media={CSS_BREAKPOINTS.large} />
      <img src={desktop} className={styles.image} loading='lazy' alt='main slide' />
    </picture>
  );
}
