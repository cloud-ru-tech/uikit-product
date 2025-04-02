import { HeroSlideImageProps } from '../HeroSlideImage';
import { HeroSlideImageBgProps } from '../HeroSlideImageBg';
import { HeroSlideVideoBgProps } from '../HeroSlideVideoBg';

type HeroImageProps = HeroSlideImageProps & {
  type: 'image';
};

type HeroImageBgProps = HeroSlideImageBgProps & {
  type: 'imageBg';
};

type HeroVideoBgProps = HeroSlideVideoBgProps & {
  type: 'videoBg';
};

export type HeroSlideMediaProps = HeroImageProps | HeroImageBgProps | HeroVideoBgProps;
