import { Expert, LimitedSectionCarouselProps, SectionCarousel } from '../../helperComponents';
import { EXPERT_MINIMAL_WIDTH, MAX_PER_PAGE } from './constants';
import { ExpertDetails } from './types';

export type SectionExpertsCarouselProps = Omit<
  LimitedSectionCarouselProps<ExpertDetails>,
  'description' | 'gap' | 'titleLink'
>;

export function SectionExpertsCarousel({ items, ...props }: SectionExpertsCarouselProps) {
  return (
    <SectionCarousel {...props} itemMinWidth={EXPERT_MINIMAL_WIDTH} maxItemsPerPage={MAX_PER_PAGE}>
      {items.map(item => (
        <Expert key={item.name} {...item} />
      ))}
    </SectionCarousel>
  );
}
