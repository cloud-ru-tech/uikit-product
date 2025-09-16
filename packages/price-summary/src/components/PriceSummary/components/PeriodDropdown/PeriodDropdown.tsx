import { ButtonDropdown } from '@sbercloud/uikit-product-button-predefined';
import { useLocale } from '@sbercloud/uikit-product-locale';
import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { Typography } from '@snack-uikit/typography';

import { usePeriodFormat } from '../../../../hooks';
import { PricePeriod } from '../../../../types';
import styles from './styles.module.scss';

export type PeriodDropdownProps = WithLayoutType<{
  period: PricePeriod;
  periodOptions: PricePeriod[];
  onPeriodChanged?: (period: PricePeriod) => void;
}>;

export function PeriodDropdown({ period, onPeriodChanged = () => {}, periodOptions, layoutType }: PeriodDropdownProps) {
  const { t } = useLocale('PriceSummary');
  const formatPeriod = usePeriodFormat();

  const actions = periodOptions
    .filter(item => item !== period)
    .map(item => ({
      content: { option: formatPeriod(item) },
      onClick: () => onPeriodChanged(item),
    }));

  return (
    <div className={styles.period} data-single={actions.length === 0 ? true : undefined}>
      <Typography.SansBodyM>{t('total')}</Typography.SansBodyM>

      {actions.length === 0 && (
        <div className={styles.single}>
          <Typography.SansBodyM>{formatPeriod(period)}</Typography.SansBodyM>
        </div>
      )}

      {actions.length > 0 && (
        <ButtonDropdown
          size='s'
          label={formatPeriod(period)}
          items={actions}
          closeDroplistOnItemClick
          layoutType={layoutType}
        />
      )}
    </div>
  );
}
