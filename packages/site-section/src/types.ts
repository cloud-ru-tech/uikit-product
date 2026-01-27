import { SiteVideoProps } from '@cloud-ru/uikit-product-site-media';
import { ValueOf } from '@snack-uikit/utils';

import { SECTION_COLORS } from './constants';

export type SectionColor = ValueOf<typeof SECTION_COLORS>;

type MediaVideoProps = Pick<SiteVideoProps, 'video' | 'onPlay' | 'onError'> & {
  image?: never;
};

type MediaImageProps = {
  video?: never;
  onPlay?: never;
  onError?: never;
  /** Ссылка на изображение */
  image: {
    src: string;
    alt?: string;
  };
};

export type MediaContentProps = MediaImageProps | MediaVideoProps;
