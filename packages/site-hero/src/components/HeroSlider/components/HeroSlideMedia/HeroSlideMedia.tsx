import { WithLayoutType } from '@cloud-ru/uikit-product-utils';

import { HeroSlideImage } from '../HeroSlideImage';
import { HeroSlideImageBg } from '../HeroSlideImageBg';
import { HeroSlideVideo } from '../HeroSlideVideo';
import { HeroSlideMediaProps } from './types';

export function HeroSlideMedia(props: WithLayoutType<HeroSlideMediaProps>) {
  switch (props.type) {
    case 'image':
      return <HeroSlideImage {...props} />;

    case 'imageBg':
      return <HeroSlideImageBg {...props} />;

    case 'video':
      return <HeroSlideVideo {...props} />;

    default:
      return null;
  }
}
