import { useLocale } from '@cloud-ru/uikit-product-locale';

import { PricePeriod } from '../types';

export function usePeriodFormat() {
  const { t } = useLocale('PriceSummary');

  return function formatPeriod(period: PricePeriod): string {
    switch (period) {
      case PricePeriod.Year:
        return t('pricePeriodYear');
      case PricePeriod.Month:
        return t('pricePeriodMonth');
      case PricePeriod.Day:
        return t('pricePeriodDay');
      case PricePeriod.Hour:
        return t('pricePeriodHour');
      case PricePeriod.Minute:
        return t('pricePeriodMinute');

      default:
        throw new Error('not reachable');
    }
  };
}
