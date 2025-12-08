import { HeroSlideImageProps } from '../HeroSlideImage';
import { HeroSlideImageBgProps } from '../HeroSlideImageBg';

type HeroImageProps = HeroSlideImageProps & {
  type: 'image';
};

type HeroImageBgProps = HeroSlideImageBgProps & {
  type: 'imageBg';
};

export type HeroSlideMediaProps = HeroImageProps | HeroImageBgProps;
