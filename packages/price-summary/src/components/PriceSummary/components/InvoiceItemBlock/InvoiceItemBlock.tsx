import { WithLayoutType } from '@cloud-ru/uikit-product-utils';
import { Typography } from '@snack-uikit/typography';

import { formatCurrency, formatDiscountValue } from '../../../../helpers';
import { InvoiceItem } from '../../../../types';
import { DiscountPercentCell } from '../DiscountPercentCell';
import { InvoiceItemLabelCell } from '../InvoiceItemLabelCell';
import styles from './styles.module.scss';

export type InvoiceItemBlockProps = WithLayoutType<{
  item: InvoiceItem;
  unavailable?: boolean;
}>;

export function InvoiceItemBlock({ item, layoutType, unavailable }: InvoiceItemBlockProps) {
  const isLimit = item.kind === 'limit';
  const isDiscount = item.kind === 'discount';
  const isSecondary = item.kind !== 'entity';

  if (unavailable && isDiscount) {
    return null;
  }

  const getDisplayedPrice = () => {
    if (unavailable || isLimit || isDiscount || item.hidePrice === true) {
      return undefined;
    }

    if (item.price !== undefined) {
      return formatCurrency(item.price);
    }

    return item.hidePrice === false ? 'n/a' : undefined;
  };

  const price = getDisplayedPrice();

  return (
    <>
      <div className={styles.itemGrid} data-secondary={isSecondary || undefined} data-limit={isLimit || undefined}>
        {!isDiscount && 'label' in item && (
          <>
            <div className={styles.labelCell}>
              <InvoiceItemLabelCell item={item} layoutType={layoutType} />
            </div>
            {price !== undefined && (
              <Typography.SansBodyS
                tag='div'
                className={styles.priceCell}
                data-price-color={item.priceColor ?? 'default'}
              >
                {price}
              </Typography.SansBodyS>
            )}
          </>
        )}
        {item.discount && !isLimit && !unavailable && (
          <>
            <div className={styles.discountLabel}>
              <DiscountPercentCell discount={item.discount} layoutType={layoutType} />
            </div>
            <Typography.SansBodyS tag='div' className={styles.discountCell}>
              {formatDiscountValue(item.discount)}
            </Typography.SansBodyS>
          </>
        )}
      </div>
      {item.kind === 'entity' &&
        item.parameters?.map((parameter, index) => (
          <InvoiceItemBlock key={index} item={parameter} layoutType={layoutType} unavailable={unavailable} />
        ))}
    </>
  );
}
