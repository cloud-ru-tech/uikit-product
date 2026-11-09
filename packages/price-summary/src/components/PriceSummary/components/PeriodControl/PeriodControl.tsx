import { useLocale } from '@cloud-ru/uikit-product-locale';
import { SegmentedControl } from '@snack-uikit/segmented-control';

import { PricePeriod } from '../../../../types';
import styles from './styles.module.scss';

const DEFAULT_PERIOD_OPTIONS = [PricePeriod.Hour, PricePeriod.Month];

export type PeriodControlProps = {
  period: PricePeriod;
  periodOptions?: PricePeriod[];
  onPeriodChanged: (period: PricePeriod) => void;
};

export function PeriodControl({ period, onPeriodChanged, periodOptions = DEFAULT_PERIOD_OPTIONS }: PeriodControlProps) {
  const { t } = useLocale('PriceSummary');
  const labels = {
    [PricePeriod.Minute]: t('periodMinute'),
    [PricePeriod.Hour]: t('periodHour'),
    [PricePeriod.Day]: t('periodDay'),
    [PricePeriod.Month]: t('periodMonth'),
    [PricePeriod.Year]: t('periodYear'),
  };

  if (!periodOptions.length) {
    return null;
  }

  return (
    <SegmentedControl
      className={styles.period}
      size='xs'
      items={periodOptions.map(value => ({ value, label: labels[value] }))}
      value={period}
      onChange={onPeriodChanged}
      aria-label={t('periodLabel')}
    />
  );
}
