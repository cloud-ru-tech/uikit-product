import { LanguageCodeType } from '@sbercloud/uikit-product-utils';
import { SearchSVG } from '@snack-uikit/icons';
import { TableEmptyStateProps } from '@snack-uikit/table';

import { textProvider, Texts } from './constants';

export function getEmptyStates(languageCode: LanguageCodeType): Record<string, TableEmptyStateProps> {
  return {
    noDataState: {
      icon: SearchSVG,
      appearance: 'neutral',
      title: textProvider(languageCode, Texts.NoDataStateTitle),
      description: textProvider(languageCode, Texts.NoDataStateDescription),
    },
    noResultsState: {
      icon: SearchSVG,
      appearance: 'neutral',
      title: textProvider(languageCode, Texts.NoResultsStateTitle),
      description: textProvider(languageCode, Texts.NoResultsStateDescription),
    },
  };
}
