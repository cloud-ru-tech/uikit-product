import cn from 'classnames';

import { useLocale } from '@cloud-ru/uikit-product-locale';
import { Typography } from '@snack-uikit/typography';

import { formatCurrency, formatPriceChange, getPriceChangeAppearance } from '../../../../helpers';
import { PriceChangeDetails } from '../../../../types';
import styles from './styles.module.scss';

export type PriceDetailsBlockProps = {
  basePrice?: number;
  priceChange?: PriceChangeDetails;
};

export function PriceDetailsBlock({ basePrice, priceChange }: PriceDetailsBlockProps) {
  const { t } = useLocale('PriceSummary');
  const formattedValue = priceChange ? formatPriceChange(priceChange) : undefined;

  if (!basePrice && !priceChange) {
    return null;
  }

  return (
    <div className={styles.priceDetails}>
      {basePrice && (
        <div className={styles.priceDetailsRow}>
          <Typography.SansBodyS tag='div'>{t('basePrice')}</Typography.SansBodyS>

          <div className={styles.priceDetailsValue}>
            <Typography.SansLabelM tag='div'>{formatCurrency(basePrice)}</Typography.SansLabelM>
          </div>
        </div>
      )}
      {priceChange && (
        <div
          className={cn(styles.priceDetailsRow, styles.priceChangeRow)}
          data-appearance={getPriceChangeAppearance(priceChange.value)}
        >
          <Typography.SansBodyS tag='div'>{t('priceChange')}</Typography.SansBodyS>

          <div className={styles.priceDetailsValue} title={formattedValue}>
            <Typography.SansLabelM tag='div'>{formattedValue}</Typography.SansLabelM>
          </div>
        </div>
      )}
    </div>
  );
}
