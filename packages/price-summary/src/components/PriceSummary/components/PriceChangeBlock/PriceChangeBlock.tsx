import cn from 'classnames';

import { useLocale } from '@cloud-ru/uikit-product-locale';
import { WithLayoutType } from '@cloud-ru/uikit-product-utils';
import { Typography } from '@snack-uikit/typography';

import { formatCurrency, formatPriceChange, getPriceChangeAppearance } from '../../../../helpers';
import { PriceChangeDetails } from '../../../../types';
import { SummaryTooltip } from '../SummaryTooltip';
import styles from './styles.module.scss';

export type PriceDetailsBlockProps = WithLayoutType<{
  basePrice?: number;
  basePriceLabel?: string;
  priceChange?: PriceChangeDetails;
}>;

export function PriceDetailsBlock({ basePrice, basePriceLabel, priceChange, layoutType }: PriceDetailsBlockProps) {
  const { t } = useLocale('PriceSummary');

  if (basePrice === undefined && !priceChange) {
    return null;
  }

  return (
    <div>
      {basePrice !== undefined && (
        <div className={styles.priceDetailsRow}>
          <Typography.SansBodyS tag='div'>
            {basePriceLabel ?? t(priceChange ? 'defaultConfiguration' : 'basePrice')}
          </Typography.SansBodyS>
          <Typography.SansLabelM tag='div' className={styles.priceDetailsValue}>
            {formatCurrency(basePrice)}
          </Typography.SansLabelM>
        </div>
      )}
      {priceChange && (
        <div
          className={cn(styles.priceDetailsRow, styles.priceChangeRow)}
          data-appearance={getPriceChangeAppearance(priceChange.value)}
        >
          <div className={styles.label}>
            <Typography.SansBodyS tag='div'>{t('priceChange')}</Typography.SansBodyS>
            <SummaryTooltip
              tip={priceChange.tooltip ?? t('priceChangeTooltip')}
              label={t('priceChange')}
              layoutType={layoutType}
            />
          </div>
          <Typography.SansLabelM tag='div' className={styles.priceDetailsValue}>
            {formatPriceChange(priceChange)}
          </Typography.SansLabelM>
        </div>
      )}
    </div>
  );
}
