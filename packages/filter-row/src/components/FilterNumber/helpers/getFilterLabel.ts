import { LanguageCodeType } from '@sbercloud/uikit-product-utils';

import { COMPARE_OPTIONS } from './constants';
import { textProvider } from './textsProvider';
import { FilterNumberValue } from './types';

export const getFilterLabel = ({
  filterState,
  languageCode,
}: {
  filterState: FilterNumberValue;
  languageCode: LanguageCodeType;
}) => {
  const startLabel = filterState.startValue;
  const endLabel = filterState.endValue ? `—${filterState.endValue}` : '';
  const comparisonTextKey = COMPARE_OPTIONS.find(({ value }) => value === filterState.comparison)?.textKey;
  const comparisonLabel = comparisonTextKey ? textProvider<string>(languageCode, comparisonTextKey) + ' ' : '';

  return `${comparisonLabel}${startLabel}${endLabel}`;
};
