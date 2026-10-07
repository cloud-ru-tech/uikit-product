import { SiteVideo } from '@cloud-ru/uikit-product-site-media';
import { WithLayoutType } from '@cloud-ru/uikit-product-utils';

import styles from './styles.module.scss';

export type HeroSlideVideoProps = {
  videoSrc: string;
  poster: string;
};

export function HeroSlideVideo({ videoSrc, poster, layoutType }: WithLayoutType<HeroSlideVideoProps>) {
  return (
    <div className={styles.mediaWrapper} data-layout-type={layoutType}>
      <SiteVideo
        video={{
          src: videoSrc,
          poster,
          muted: true,
          loop: true,
          autoPlay: true,
        }}
        layoutType={layoutType}
        className={styles.video}
      />
    </div>
  );
}
