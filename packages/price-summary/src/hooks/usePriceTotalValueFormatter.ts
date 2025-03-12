import { useCallback } from 'react';

import { formatCurrency } from '../helpers';
import { PricePeriod } from '../types';
import { usePeriodFormat } from './usePeriodFormat';

export function usePriceTotalValueFormatter() {
  const formatPeriod = usePeriodFormat();

  return useCallback(
    (value: number | undefined, period: PricePeriod) => `${formatCurrency(value || 0)} ${formatPeriod(period)}`,
    [formatPeriod],
  );
}
