import { SiteVideoProps } from '@sbercloud/uikit-product-site-video';
import { ValueOf } from '@snack-uikit/utils';

import { SECTION_COLORS } from './constants';

export type SectionColor = ValueOf<typeof SECTION_COLORS>;

type MediaVideoProps = Pick<SiteVideoProps, 'video' | 'onPlay'> & {
  image?: never;
};

type MediaImageProps = {
  video?: never;
  onPlay?: never;
  /** Ссылка на изображение */
  image: {
    src: string;
    alt?: string;
  };
};

export type MediaContentProps = MediaImageProps | MediaVideoProps;
