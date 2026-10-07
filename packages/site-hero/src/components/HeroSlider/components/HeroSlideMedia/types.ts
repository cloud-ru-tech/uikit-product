import { HeroSlideImageProps } from '../HeroSlideImage';
import { HeroSlideImageBgProps } from '../HeroSlideImageBg';
import { HeroSlideVideoProps } from '../HeroSlideVideo';

type HeroImageProps = HeroSlideImageProps & {
  type: 'image';
};

type HeroImageBgProps = HeroSlideImageBgProps & {
  type: 'imageBg';
};

type HeroVideoProps = HeroSlideVideoProps & {
  type: 'video';
};

export type HeroSlideMediaProps = HeroImageProps | HeroImageBgProps | HeroVideoProps;
