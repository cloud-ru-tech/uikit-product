import { InfoFilledSVG } from '@sbercloud/uikit-product-icons';
import { Typography } from '@snack-uikit/typography';

import { formatCurrency } from '../../../../helpers';
import styles from './styles.module.scss';

export type TotalValueBlockProps = {
  value: number | undefined;
  hint?: string;
};

export function TotalValueBlock({ value = 0, hint }: TotalValueBlockProps) {
  return (
    <div className={styles.content}>
      <Typography.LightHeadlineS>{formatCurrency(value)}</Typography.LightHeadlineS>

      {hint && (
        <div className={styles.hint}>
          <InfoFilledSVG size={16} className={styles.icon} />
          <Typography.SansBodyS>{hint}</Typography.SansBodyS>
        </div>
      )}
    </div>
  );
}
