import { LayoutType } from '@sbercloud/uikit-product-utils';
import { TypographyProps } from '@snack-uikit/typography';

import { HeroSlideImageProps } from '../HeroSlideImage';
import { HeroSlideBaseProps } from './types';

export const getTitleProps = (layoutType: LayoutType): Pick<TypographyProps, 'purpose' | 'size'> => {
  switch (layoutType) {
    case 'mobile':
    case 'tablet':
      return {
        purpose: 'headline',
        size: 'l',
      };
    default:
      return {
        purpose: 'display',
        size: 'm',
      };
  }
};

export const getSliderContentWrapperImageType = (
  media: HeroSlideBaseProps['media'],
): HeroSlideImageProps['format'] | undefined => {
  switch (media.type) {
    case 'image':
      return media.format;

    case 'imageBg':
    case 'videoBg':
    default:
      return undefined;
  }
};
