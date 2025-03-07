import { useMemo } from 'react';

import { CardMedia, CardMediaProps } from '@sbercloud/uikit-product-site-cards';

import { LimitedSectionCarouselProps, SectionCarousel } from '../../helperComponents';
import { getCarouselProps } from './utils';

export type BlogCarouselItem = Omit<CardMediaProps, 'size' | 'layoutType'>;

export type SectionBlogCarouselProps = Omit<LimitedSectionCarouselProps<BlogCarouselItem>, 'gap'>;

export function SectionBlogCarousel({ items, ...props }: SectionBlogCarouselProps) {
  const carouselProps = useMemo(() => getCarouselProps(props.layoutType), [props.layoutType]);

  return (
    <SectionCarousel {...props} {...carouselProps}>
      {items.map(item => (
        <CardMedia key={item.title} {...item} size='m' layoutType={props.layoutType} />
      ))}
    </SectionCarousel>
  );
}
