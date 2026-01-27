import { WithLayoutType } from '@cloud-ru/uikit-product-utils';
import { Typography } from '@snack-uikit/typography';

import { formatCurrency } from '../../../../helpers';
import { InvoiceItem } from '../../../../types';
import { DiscountPercentCell } from '../DiscountPercentCell';
import { Divider } from '../Divider';
import { InvoiceItemLabelCell } from '../InvoiceItemLabelCell';
import styles from './styles.module.scss';

export type InvoiceItemBlockProps = WithLayoutType<{
  item: InvoiceItem;
  index: number;
}>;

export function InvoiceItemBlock({ item, index, layoutType }: InvoiceItemBlockProps) {
  const isEven = (index + 1) % 2 === 0;

  const isSecondary = item.primary === undefined ? isEven : !item.primary;

  const getPriceItem = () => {
    if (item.hidePrice === false) {
      return item.price !== undefined ? formatCurrency(item.price) : 'n/a';
    }

    return item.price !== undefined ? formatCurrency(item.price) : undefined;
  };

  return (
    <>
      {item.topDivider && <Divider />}

      <div className={styles.itemGrid} data-discount={Boolean(item.discount)}>
        {'label' in item && item.label !== undefined && (
          <>
            <div className={styles.labelCell} data-secondary={isSecondary}>
              <InvoiceItemLabelCell item={item} layoutType={layoutType} />
            </div>

            <Typography.SansBodyS tag='div' className={styles.priceCell} data-secondary={isSecondary}>
              {getPriceItem()}
            </Typography.SansBodyS>
          </>
        )}

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
