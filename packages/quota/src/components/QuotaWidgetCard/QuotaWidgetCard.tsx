import { useLocale } from '@cloud-ru/uikit-product-locale';
import { WithSupportProps } from '@cloud-ru/uikit-product-utils';
import { ProgressBar } from '@snack-uikit/progress-bar';
import { Tooltip } from '@snack-uikit/tooltip';
import { TruncateString } from '@snack-uikit/truncate-string';
import { Typography } from '@snack-uikit/typography';

import { QuotaItem } from '../../types';
import { formatNumber } from '../../utils/formatNumber';
import { getPercent } from '../../utils/getPercent';
import { QuotaTooltip } from './components/QuotaTooltip';
import styles from './styles.module.scss';

export type QuotaWidgetCardProps = WithSupportProps<{
  /** Отображаемая квота */
  quota: QuotaItem;
}>;

const QUOTA_USAGE_PROGRESS = {
  HIGH: 90,
  MEDIUM: 70,
} as const;

function getProgressAppearance(percent: number) {
  if (percent >= QUOTA_USAGE_PROGRESS.HIGH) {
    return 'red';
  } else if (percent >= QUOTA_USAGE_PROGRESS.MEDIUM) {
    return 'orange';
  }
  return 'green';
}

export function QuotaWidgetCard({ quota, ...props }: QuotaWidgetCardProps) {
  const { t } = useLocale('Quota');

  const percent = getPercent(quota);

  const rows = [
    {
      label: t('cardAvailable'),
      value: quota.limit,
    },
    {
      label: t('cardRemaining'),
      value: quota.remains,
    },
  ];

  return (
    <Tooltip triggerClassName={styles.tooltip} hoverDelayOpen={500} tip={<QuotaTooltip quota={quota} />}>
      <div className={styles.card} data-exhausted={quota.remains === 0} {...props}>
        <div className={styles.header}>
          <Typography.SansBodyM className={styles.title}>
            <TruncateString maxLines={2} text={quota.name} />
          </Typography.SansBodyM>

          <Typography.SansLabelM className={styles.percent}>{formatNumber(percent)}%</Typography.SansLabelM>
        </div>

        <ProgressBar progress={percent} size='xs' appearance={getProgressAppearance(percent)} />

        <div className={styles.info}>
          {rows.map(row => (
            <div className={styles.row} key={row.label}>
              <Typography.SansLabelM className={styles.label}>{row.label}</Typography.SansLabelM>

              <Typography.SansLabelL className={styles.value}>
                {formatNumber(row.value)} <span className={styles.unit}>{quota.unitDisplayName}</span>
              </Typography.SansLabelL>
            </div>
          ))}
        </div>
      </div>
    </Tooltip>
  );
}
