import { useMemo } from 'react';

import { CaseCard, CaseCardProps } from '@cloud-ru/uikit-product-site-case-card';

import { LimitedSectionCarouselProps, SectionCarousel } from '../../helperComponents';
import { getCarouselProps } from './utils';

export type CaseItem = Omit<CaseCardProps, 'layoutType'>;

export type SectionCaseCarouselProps = Omit<LimitedSectionCarouselProps<CaseItem>, 'description' | 'gap' | 'titleLink'>;

export function SectionCaseCarousel({ items, layoutType, ...props }: SectionCaseCarouselProps) {
  const carouselProps = useMemo(() => getCarouselProps(layoutType), [layoutType]);

  return (
    <SectionCarousel {...props} {...carouselProps} layoutType={layoutType} gap='2px'>
      {items.map(item => (
        <CaseCard key={item.description} {...item} layoutType={layoutType} />
      ))}
    </SectionCarousel>
  );
}
