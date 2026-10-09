import { WithLayoutType } from '@cloud-ru/uikit-product-utils';

import styles from './styles.module.scss';

export type HeroSlideVideoProps = {
  videoSrc: string;
  poster: string;
};

export function HeroSlideVideo({ videoSrc, poster, layoutType }: WithLayoutType<HeroSlideVideoProps>) {
  return (
    <div className={styles.mediaWrapper} data-layout-type={layoutType}>
      <video
        width='100%'
        height='100%'
        autoPlay
        muted
        playsInline
        loop
        rel='nofollow'
        preload='auto'
        poster={poster}
        className={styles.video}
        onContextMenu={(event: React.MouseEvent<HTMLVideoElement, MouseEvent>) => event.preventDefault()}
      >
        <source src={videoSrc} type='video/mp4' />
      </video>
    </div>
  );
}
