import { Fragment } from 'react';

import { useLocale } from '@sbercloud/uikit-product-locale';
import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { Typography } from '@snack-uikit/typography';

import { formatCurrency } from '../../../../helpers';
import { DiscountDetails } from '../../../../types';
import { DiscountPercentCell } from '../DiscountPercentCell';
import styles from './styles.module.scss';

export type DiscountBlockProps = WithLayoutType<{
  value: DiscountDetails;
}>;

export function DiscountBlock({ value, layoutType }: DiscountBlockProps) {
  const { t } = useLocale('PriceSummary');

  return (
    <>
      <div className={styles.discountGrid}>
        <Typography.SansBodyS tag='div'>{t('basePrice')}</Typography.SansBodyS>

        <Typography.SansLabelM tag='div' className={styles.priceCell}>
          {formatCurrency(value.price)}
        </Typography.SansLabelM>
      </div>

      <div className={styles.discountGrid}>
        {value.discounts.map((discount, index) => (
          <Fragment key={index}>
            <DiscountPercentCell discount={discount} layoutType={layoutType} />

            <Typography.SansLabelM tag='div' className={styles.discountCell}>
              {formatCurrency(-Math.abs(discount.value))}
            </Typography.SansLabelM>
          </Fragment>
        ))}
      </div>
    </>
  );
}
