import { formatNumber } from '@sbercloud/ft-formatters';
import { AdaptiveQuestionTooltip } from '@sbercloud/uikit-product-mobile-tooltip';
import { useLanguage, WithLayoutType } from '@sbercloud/uikit-product-utils';
import { Typography } from '@snack-uikit/typography';

import { textProvider, Texts } from '../../../../helpers';
import { DiscountItem } from '../../../../types';
import styles from './styles.module.scss';

export type DiscountPercentCellProps = WithLayoutType<{
  discount: DiscountItem;
}>;

export function DiscountPercentCell({ discount, layoutType }: DiscountPercentCellProps) {
  const { languageCode } = useLanguage();

  return (
    <div className={styles.percentCell}>
      {discount.percent && (
        <>
          <Typography.SansBodyS>
            {textProvider(languageCode, Texts.Discount)} {formatNumber(-Math.abs(discount.percent))}%
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
