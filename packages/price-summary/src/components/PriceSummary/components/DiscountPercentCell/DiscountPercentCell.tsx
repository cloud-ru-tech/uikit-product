import { formatNumber } from '@cloud-ru/ft-formatters';
import { useLocale } from '@cloud-ru/uikit-product-locale';
import { WithLayoutType } from '@cloud-ru/uikit-product-utils';
import { Typography } from '@snack-uikit/typography';

import { DiscountItem } from '../../../../types';
import { SummaryTooltip } from '../SummaryTooltip';
import styles from './styles.module.scss';

export type DiscountPercentCellProps = WithLayoutType<{
  discount: DiscountItem;
}>;

function getDiscountLabel(discount: DiscountItem, defaultLabel: string): string {
  if (discount.label !== undefined) {
    return discount.label;
  }

  if (discount.percent === undefined || discount.valueFormat === 'percent') {
    return defaultLabel;
  }

  const percent = formatNumber(-Math.abs(discount.percent));

  return `${defaultLabel} ${percent}%`;
}

export function DiscountPercentCell({ discount, layoutType }: DiscountPercentCellProps) {
  const { t } = useLocale('PriceSummary');
  const label = getDiscountLabel(discount, t('discount'));

  return (
    <div className={styles.percentCell}>
      <Typography.SansBodyS>{label}</Typography.SansBodyS>
      {discount.tooltip && <SummaryTooltip tip={discount.tooltip} label={label} layoutType={layoutType} />}
    </div>
  );
}
