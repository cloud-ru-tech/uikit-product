import { useMemo } from 'react';

import { themeVars } from '@snack-uikit/figma-tokens';

import { CardClient, CardClientProps, LimitedSectionCarouselProps, SectionCarousel } from '../../helperComponents';
import { getCarouselProps } from './utils';

export type SectionClientsCarouselProps = Omit<
  LimitedSectionCarouselProps<CardClientProps>,
  'description' | 'gap' | 'titleLink'
>;

export function SectionClientsCarousel({ items, ...props }: SectionClientsCarouselProps) {
  const carouselProps = useMemo(() => getCarouselProps(props.layoutType), [props.layoutType]);

  return (
    <SectionCarousel autoSwipe={0} {...props} {...carouselProps} gap={themeVars.dimension['025m']}>
      {items.map(item => (
        <CardClient key={item.alt} {...item} />
      ))}
    </SectionCarousel>
  );
}
