import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { ChipChoice, ChipChoiceRow, ChipChoiceRowProps, FiltersState } from '@snack-uikit/chips';

import { MobileChipChoice } from '../MobileChipChoice';
import { MobileChipChoiceRow } from '../MobileChipChoiceRow';

export function AdaptiveChipChoiceRow<T extends FiltersState>({
  layoutType,
  ...props
}: WithLayoutType<ChipChoiceRowProps<T>>) {
  const isMobile = layoutType === 'mobile';

  return isMobile ? <MobileChipChoiceRow {...props} /> : <ChipChoiceRow {...props} />;
}

export function useAdaptiveChipChoice({ layoutType }: WithLayoutType) {
  const isMobile = layoutType === 'mobile';

  return isMobile ? MobileChipChoice : ChipChoice;
}

export type { ChipChoiceRowProps };
