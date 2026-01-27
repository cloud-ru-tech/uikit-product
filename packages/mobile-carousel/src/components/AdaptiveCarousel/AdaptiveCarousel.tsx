import { WithLayoutType } from '@cloud-ru/uikit-product-utils';
import { Carousel, CarouselProps } from '@snack-uikit/carousel';

import { MobileCarousel } from '../MobileCarousel';

export type AdaptiveCarouselProps = WithLayoutType<CarouselProps>;

export function AdaptiveCarousel({ layoutType, ...props }: AdaptiveCarouselProps) {
  const isMobile = layoutType === 'mobile';
  return isMobile ? <MobileCarousel {...props} /> : <Carousel {...props} />;
}

export type { CarouselProps };
