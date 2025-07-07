import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { Carousel, CarouselProps } from '@snack-uikit/carousel';

import { MobileCarousel } from '../MobileCarousel';

export function AdaptiveCarousel({ layoutType, ...props }: WithLayoutType<CarouselProps>) {
  const isMobile = layoutType === 'mobile';
  return isMobile ? <MobileCarousel {...props} /> : <Carousel {...props} />;
}

export type { CarouselProps };
