import { WithLayoutType } from '@cloud-ru/uikit-product-utils';
import { Typography } from '@snack-uikit/typography';

import { formatDiscountValue } from '../../../../helpers';
import { DiscountDetails } from '../../../../types';
import { DiscountPercentCell } from '../DiscountPercentCell';
import styles from './styles.module.scss';

export type DiscountBlockProps = WithLayoutType<{
  value: DiscountDetails;
}>;

export function DiscountBlock({ value, layoutType }: DiscountBlockProps) {
  return (
    <div className={styles.discounts}>
      {value.discounts.map((discount, index) => (
        <div key={index} className={styles.discountGrid}>
          <DiscountPercentCell discount={discount} layoutType={layoutType} />
          <Typography.SansLabelM tag='div' className={styles.discountCell}>
            {formatDiscountValue(discount)}
          </Typography.SansLabelM>
        </div>
      ))}
    </div>
  );
}
