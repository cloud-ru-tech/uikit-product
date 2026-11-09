import { WithLayoutType } from '@cloud-ru/uikit-product-utils';
import { TruncateString } from '@snack-uikit/truncate-string';
import { Typography } from '@snack-uikit/typography';

import { formatQuantity } from '../../../../helpers';
import { InvoiceItem } from '../../../../types';
import { SummaryTooltip } from '../SummaryTooltip';
import styles from './styles.module.scss';

export type InvoiceItemLabelCellProps = WithLayoutType<{
  item: InvoiceItem;
}>;

export function InvoiceItemLabelCell({ item, layoutType }: InvoiceItemLabelCellProps) {
  if (!('label' in item)) {
    return null;
  }

  const label = item.unit ? item.label + ', ' + item.unit : item.label;

  return (
    <Typography.SansBodyS className={styles.labelCell}>
      <Typography.SansBodyS tag='div' className={styles.label}>
        {item.labelMaxLines ? <TruncateString text={label} maxLines={item.labelMaxLines} /> : label}
        {item.quantity !== undefined && item.quantity !== '' && (
          <Typography.SansBodyS tag='span' className={styles.quantity}>
            {' '}
            {formatQuantity(item.quantity)}
          </Typography.SansBodyS>
        )}
      </Typography.SansBodyS>
      {item.labelTooltip && <SummaryTooltip tip={item.labelTooltip} label={item.label} layoutType={layoutType} />}
    </Typography.SansBodyS>
  );
}
