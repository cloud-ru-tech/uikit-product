import { useLocale } from '@cloud-ru/uikit-product-locale';
import { Typography } from '@snack-uikit/typography';

import { QuotaItem } from '../../../../types';
import { formatNumber } from '../../../../utils/formatNumber';
import styles from './styles.module.scss';

type QuotaTooltipProps = {
  quota: QuotaItem;
};

export function QuotaTooltip({ quota }: QuotaTooltipProps) {
  const { t } = useLocale('Quota');

  const rows = [
    { label: t('tooltipAvailable'), value: quota.limit },
    { label: t('tooltipUsed'), value: quota.usage },
    { label: t('tooltipRemaining'), value: quota.remains },
  ];

  return (
    <div className={styles.content}>
      {rows.map(row => (
        <div className={styles.row} key={row.label}>
          <Typography.SansBodyS>{row.label}</Typography.SansBodyS>

          <Typography.SansBodyS>
            {formatNumber(row.value)} {quota.unitDisplayName}
          </Typography.SansBodyS>
        </div>
      ))}

      {quota.remains === 0 && (
        <div className={styles.exhausted}>
          <Typography.SansBodyS tag='div'>{t('tooltipExhaustedHint.first')}</Typography.SansBodyS>
          <Typography.SansBodyS tag='div'>{t('tooltipExhaustedHint.second')}</Typography.SansBodyS>
        </div>
      )}
    </div>
  );
}
