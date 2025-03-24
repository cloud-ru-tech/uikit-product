import { useMemo } from 'react';

import { CardPartner, CardPartnerProps } from '@sbercloud/uikit-product-site-cards';

import { LimitedSectionCarouselProps, SectionCarousel } from '../../helperComponents';
import styles from './styles.module.scss';
import { getCarouselProps } from './utils';

export type CaseItem = Omit<CardPartnerProps, 'layoutType'>;

export type SectionCaseCarouselProps = Omit<LimitedSectionCarouselProps<CaseItem>, 'description' | 'gap' | 'titleLink'>;

export function SectionCaseCarousel({ items, layoutType, ...props }: SectionCaseCarouselProps) {
  const carouselProps = useMemo(() => getCarouselProps(layoutType), [layoutType]);

  return (
    <SectionCarousel {...props} {...carouselProps} layoutType={layoutType}>
      {items.map(item => (
        <CardPartner key={item.description} {...item} layoutType={layoutType} className={styles.card} />
      ))}
    </SectionCarousel>
  );
}
