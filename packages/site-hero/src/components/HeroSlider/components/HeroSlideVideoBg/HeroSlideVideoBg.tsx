import { SiteVideo } from '@sbercloud/uikit-product-site-video';
import { WithLayoutType } from '@sbercloud/uikit-product-utils';

import { HTMLComment } from './HTMLComment';

export type HeroSlideVideoBgProps = {
  /** Ссылка на видео */
  link: string;
  /** Картинка-предпросмотр видео */
  previewImage: string;
};

export function HeroSlideVideoBg({ link, previewImage, layoutType }: WithLayoutType<HeroSlideVideoBgProps>) {
  return (
    <>
      <HTMLComment text='noindex' />
      <SiteVideo
        layoutType={layoutType}
        video={{
          src: link,
          poster: previewImage,
          muted: true,
          loop: true,
          autoPlay: true,
        }}
      />
      <HTMLComment text='/noindex' />
    </>
  );
}
