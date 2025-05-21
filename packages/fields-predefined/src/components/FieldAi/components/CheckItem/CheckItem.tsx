import { CheckSVG } from '@sbercloud/uikit-product-icons';
import { Typography } from '@snack-uikit/typography';

import styles from './styles.module.scss';

type CheckItemProps = {
  label: string;
  checked: boolean;
};

export function CheckItem({ label, checked }: CheckItemProps) {
  return (
    <div className={styles.checkItem}>
      <CheckSVG size={20} className={styles.icon} data-checked={checked} />
      <Typography.SansBodyM className={styles.label} data-checked={checked}>
        {label}
      </Typography.SansBodyM>
    </div>
  );
}
