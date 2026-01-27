import { formatNumber } from '@cloud-ru/ft-formatters';
import { useLocale } from '@cloud-ru/uikit-product-locale';
import { AdaptiveQuestionTooltip } from '@cloud-ru/uikit-product-mobile-tooltip';
import { WithLayoutType } from '@cloud-ru/uikit-product-utils';
import { Typography } from '@snack-uikit/typography';

import { DiscountItem } from '../../../../types';
import styles from './styles.module.scss';

export type DiscountPercentCellProps = WithLayoutType<{
  discount: DiscountItem;
}>;

export function DiscountPercentCell({ discount, layoutType }: DiscountPercentCellProps) {
  const { t } = useLocale('PriceSummary');

  return (
    <div className={styles.percentCell}>
      {discount.percent && (
        <>
          <Typography.SansBodyS>
            {t('discount')} {formatNumber(-Math.abs(discount.percent))}%
          </Typography.SansBodyS>

          {discount.tooltip && (
            <AdaptiveQuestionTooltip
              layoutType={layoutType}
              tip={discount.tooltip}
              trigger={layoutType === 'mobile' ? 'click' : 'hover'}
            />
          )}
        </>
      )}
    </div>
  );
}
