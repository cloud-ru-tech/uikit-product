import { useEffect, useState } from 'react';

import { CheckSVG } from '@sbercloud/uikit-product-icons';
import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { Typography } from '@snack-uikit/typography';

import styles from './styles.module.scss';

type CheckItemProps = WithLayoutType<{
  label: string;
  checked: boolean;
  shouldHide?: boolean;
  animated?: boolean;
}>;

const CHECKED_ITEM_DISAPPEAR_TIMEOUT = 500;

export function CheckItem({ label, checked, layoutType, shouldHide = false, animated = false }: CheckItemProps) {
  const [visible, setVisible] = useState(checked);

  useEffect(() => {
    if (checked) {
      const timeoutId = setTimeout(() => {
        setVisible(false);
      }, CHECKED_ITEM_DISAPPEAR_TIMEOUT);

      return () => clearTimeout(timeoutId);
    }

    setVisible(true);
  }, [checked]);

  if (shouldHide && !visible) {
    return null;
  }

  return (
    <div className={styles.checkItem} data-layout-type={layoutType} data-animated={animated}>
      <CheckSVG size={20} className={styles.icon} data-checked={checked} />
      <Typography.SansBodyM className={styles.label} data-checked={checked}>
        {label}
      </Typography.SansBodyM>
    </div>
  );
}
