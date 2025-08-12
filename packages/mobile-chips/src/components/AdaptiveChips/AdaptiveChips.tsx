import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { ChipChoice, ChipChoiceRow, ChipChoiceRowProps, FiltersState } from '@snack-uikit/chips';

import { MobileChipChoice } from '../MobileChipChoice';
import { MobileChipChoiceRow } from '../MobileChipChoiceRow';

export type AdaptiveChipChoiceRow<T extends FiltersState> = WithLayoutType<ChipChoiceRowProps<T>>;

export function AdaptiveChipChoiceRow<T extends FiltersState>({ layoutType, ...props }: AdaptiveChipChoiceRow<T>) {
  const isMobile = layoutType === 'mobile';

  return isMobile ? <MobileChipChoiceRow {...props} /> : <ChipChoiceRow {...props} />;
}

export function useAdaptiveChipChoice({ layoutType }: WithLayoutType): typeof ChipChoice {
  const isMobile = layoutType === 'mobile';

  return isMobile ? MobileChipChoice : ChipChoice;
}

export type { ChipChoiceRowProps };
