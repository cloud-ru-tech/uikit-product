import { useMemo } from 'react';

import { CardMarketplace, CardMarketplaceProps } from '@sbercloud/uikit-product-site-cards';

import { LimitedSectionCarouselProps, SectionCarousel } from '../../helperComponents';
import { getCarouselProps } from './utils';

export type SectionMarketplaceCarouselProps = Omit<
  LimitedSectionCarouselProps<CardMarketplaceProps>,
  'gap' | 'titleLink'
>;

export function SectionMarketplaceCarousel({ items, ...props }: SectionMarketplaceCarouselProps) {
  const carouselProps = useMemo(() => getCarouselProps(props.layoutType), [props]);

  return (
    <SectionCarousel {...props} {...carouselProps} gap='2px'>
      {items.map(item => (
        <CardMarketplace key={item.title} {...item} />
      ))}
    </SectionCarousel>
  );
}
