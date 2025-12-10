import { CrossFilledSVG } from '@sbercloud/uikit-product-icons';
import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { Typography } from '@snack-uikit/typography';

import styles from './styles.module.scss';

type CheckItemProps = WithLayoutType<{
  label: string;
}>;

export function CheckItem({ label, layoutType }: CheckItemProps) {
  return (
    <div className={styles.checkItem} data-layout-type={layoutType}>
      <div className={styles.iconWrapper}>
        <CrossFilledSVG size={16} className={styles.icon} />
      </div>

      <Typography.SansBodyM data-layout-type={layoutType} className={styles.label}>
        {label}
      </Typography.SansBodyM>
    </div>
  );
}
