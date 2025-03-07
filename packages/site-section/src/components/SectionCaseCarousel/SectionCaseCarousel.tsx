import { useMemo } from 'react';

import { CardPartner, CardPartnerProps } from '@sbercloud/uikit-product-site-cards';

import { LimitedSectionCarouselProps, SectionCarousel } from '../../helperComponents';
import { getCarouselProps } from './utils';

export type CaseItem = CardPartnerProps;

export type SectionCaseCarouselProps = Omit<LimitedSectionCarouselProps<CaseItem>, 'description' | 'gap'>;

export function SectionCaseCarousel({ items, ...props }: SectionCaseCarouselProps) {
  const carouselProps = useMemo(() => getCarouselProps(props.layoutType), [props.layoutType]);

  return (
    <SectionCarousel {...props} {...carouselProps}>
      {items.map(item => (
        <CardPartner key={item.description} {...item} />
      ))}
    </SectionCarousel>
  );
}
