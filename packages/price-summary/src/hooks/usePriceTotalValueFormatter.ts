import { useCallback } from 'react';

import { useLanguage } from '@sbercloud/uikit-product-utils';

import { formatCurrency, formatPeriod } from '../helpers';
import { PricePeriod } from '../types';

export function usePriceTotalValueFormatter() {
  const { languageCode } = useLanguage();

  return useCallback(
    (value: number | undefined, period: PricePeriod) =>
      `${formatCurrency(value || 0)} ${formatPeriod(languageCode, period)}`,
    [languageCode],
  );
}
