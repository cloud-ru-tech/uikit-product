import { CSS_BREAKPOINTS, WithLayoutType } from '@sbercloud/uikit-product-utils';

import styles from './styles.module.scss';

export type HeroSlideImageProps = {
  /** Ссылки на картинку */
  source: {
    desktop: string;
    tablet?: string;
  };
  /** Форма картинки */
  format: 'rectangle' | 'square' | 'custom';
};

export function HeroSlideImage({ source, format, layoutType }: WithLayoutType<HeroSlideImageProps>) {
  const { tablet, desktop } = source;

  if (layoutType === 'mobile') {
    return null;
  }

  return (
    <picture className={styles.imageWrapper} data-image-format={format} data-layout-type={layoutType}>
      {tablet && <source srcSet={tablet} media={CSS_BREAKPOINTS.tablet} />}
      <source srcSet={desktop} media={CSS_BREAKPOINTS.large} />
      <img src={desktop} className={styles.image} data-image-format={format} loading='lazy' alt='main slide' />
    </picture>
  );
}
