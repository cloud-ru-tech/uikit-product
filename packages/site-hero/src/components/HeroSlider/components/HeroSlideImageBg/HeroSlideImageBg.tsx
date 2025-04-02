import { CSS_BREAKPOINTS, WithLayoutType } from '@sbercloud/uikit-product-utils';

import styles from './styles.module.scss';

export type HeroSlideImageBgProps = {
  /** Ссылки на картинку-фон */
  source: {
    desktopLg?: string;
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
      {source.desktopLg ? (
        <>
          <source srcSet={source.desktop} media={CSS_BREAKPOINTS.desktop} />
          <source srcSet={source.desktopLg} />
        </>
      ) : (
        <source srcSet={source.desktop} />
      )}
      <img loading='lazy' src={source.desktop} className={styles.backgroundImage} alt='background' />
    </picture>
  );
}
