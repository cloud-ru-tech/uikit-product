import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { TruncateString } from '@snack-uikit/truncate-string';
import { Typography } from '@snack-uikit/typography';

import { formatCurrency, formatQuantity } from '../../../../helpers';
import { InvoiceItem } from '../../../../types';
import { DiscountPercentCell } from '../DiscountPercentCell';
import { Divider } from '../Divider';
import styles from './styles.module.scss';

export type InvoiceItemBlockProps = WithLayoutType<{
  item: InvoiceItem;
  index: number;
}>;

export function InvoiceItemBlock({ item, index, layoutType }: InvoiceItemBlockProps) {
  const isEven = (index + 1) % 2 === 0;

  const isSecondary = item.primary === undefined ? isEven : !item.primary;

  return (
    <>
      {item.topDivider && <Divider />}

      <div className={styles.itemGrid} data-discount={Boolean(item.discount)}>
        <div className={styles.labelCell} data-secondary={isSecondary}>
          <Typography.SansBodyS>
            {item.labelMaxLines ? <TruncateString text={item.label} maxLines={item.labelMaxLines} /> : item.label}
          </Typography.SansBodyS>

          {item.quantity && <Typography.SansBodyS>{formatQuantity(item.quantity)}</Typography.SansBodyS>}
        </div>

        <Typography.SansBodyS tag='div' className={styles.priceCell} data-secondary={isSecondary}>
          {item.price !== undefined ? formatCurrency(item.price) : undefined}
        </Typography.SansBodyS>

        {item.discount && (
          <>
            <div className={styles.percentCell} data-secondary={isSecondary}>
              <DiscountPercentCell discount={item.discount} layoutType={layoutType} />
            </div>

            <Typography.SansBodyS tag='div' className={styles.discountCell} data-secondary={isSecondary}>
              {formatCurrency(-Math.abs(item.discount.value))}
            </Typography.SansBodyS>
          </>
        )}
      </div>

      {item.bottomDivider && <Divider />}
    </>
  );
}
