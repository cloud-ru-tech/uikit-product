import { WithLayoutType } from '@sbercloud/uikit-product-utils';

import { HeroSlideImage } from '../HeroSlideImage';
import { HeroSlideImageBg } from '../HeroSlideImageBg';
import { HeroSlideVideoBg } from '../HeroSlideVideoBg';
import { HeroSlideMediaProps } from './types';

export function HeroSlideMedia(props: WithLayoutType<HeroSlideMediaProps>) {
  switch (props.type) {
    case 'image':
      return <HeroSlideImage {...props} />;

    case 'imageBg':
      return <HeroSlideImageBg {...props} />;

    case 'videoBg':
      return <HeroSlideVideoBg {...props} />;

    default:
      return null;
  }
}
