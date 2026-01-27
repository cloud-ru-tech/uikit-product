import { AdaptiveQuestionTooltip } from '@cloud-ru/uikit-product-mobile-tooltip';
import { WithLayoutType } from '@cloud-ru/uikit-product-utils';
import { TruncateString } from '@snack-uikit/truncate-string';
import { Typography } from '@snack-uikit/typography';

import { formatQuantity } from '../../../../helpers';
import { InvoiceItem } from '../../../../types';
import styles from './styles.module.scss';

export type InvoiceItemLabelCellProps = WithLayoutType<{
  item: InvoiceItem;
}>;

export function InvoiceItemLabelCell({ item, layoutType }: InvoiceItemLabelCellProps) {
  return (
    'label' in item &&
    item.label !== undefined && (
      <>
        <div className={styles.labelCell}>
          <Typography.SansBodyS className={styles.label}>
            {item.labelMaxLines ? <TruncateString text={item.label} maxLines={item.labelMaxLines} /> : item.label}
          </Typography.SansBodyS>

          {item.labelTooltip && (
            <AdaptiveQuestionTooltip
              layoutType={layoutType}
              tip={item.labelTooltip}
              trigger={layoutType === 'mobile' ? 'click' : 'hover'}
            />
          )}
        </div>

        {item.quantity && (
          <Typography.SansBodyS className={styles.quantity}>{formatQuantity(item.quantity)}</Typography.SansBodyS>
        )}
      </>
    )
  );
}
