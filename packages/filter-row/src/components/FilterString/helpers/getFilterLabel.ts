import { LanguageCodeType } from '@sbercloud/uikit-product-utils';

import { COMPARE_OPTIONS } from './constants';
import { textProvider } from './textsProvider';
import { FilterStringValue } from './types';

export const getFilterLabel = ({
  filterState,
  languageCode,
}: {
  filterState: FilterStringValue;
  languageCode: LanguageCodeType;
}) => {
  const comparisonTextKey = COMPARE_OPTIONS.find(({ value }) => value === filterState.comparison)?.textKey;
  const comparisonLabel = comparisonTextKey ? textProvider<string>(languageCode, comparisonTextKey) + ' ' : '';

  return `${comparisonLabel}${filterState.value}`;
};
