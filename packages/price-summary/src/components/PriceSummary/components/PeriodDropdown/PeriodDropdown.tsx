import { ButtonDropdown } from '@sbercloud/uikit-product-button-predefined';
import { useLanguage } from '@sbercloud/uikit-product-utils';
import { Typography } from '@snack-uikit/typography';

import { formatPeriod, textProvider, Texts } from '../../../../helpers';
import { PricePeriod } from '../../../../types';
import styles from './styles.module.scss';

export type PeriodDropdownProps = {
  period: PricePeriod;
  periodOptions: PricePeriod[];
  onPeriodChanged?: (period: PricePeriod) => void;
};

export function PeriodDropdown({ period, onPeriodChanged = () => {}, periodOptions }: PeriodDropdownProps) {
  const { languageCode } = useLanguage();

  const actions = periodOptions
    .filter(item => item !== period)
    .map(item => ({
      content: { option: formatPeriod(languageCode, item) },
      onClick: () => onPeriodChanged(item),
    }));

  return (
    <div className={styles.period} data-single={actions.length === 0 ? true : undefined}>
      <Typography.SansBodyM>{textProvider(languageCode, Texts.Total)}</Typography.SansBodyM>

      {actions.length === 0 && (
        <div className={styles.single}>
          <Typography.SansBodyM>{formatPeriod(languageCode, period)}</Typography.SansBodyM>
        </div>
      )}

      {actions.length > 0 && (
        <ButtonDropdown size='s' label={formatPeriod(languageCode, period)} items={actions} closeDroplistOnItemClick />
      )}
    </div>
  );
}
