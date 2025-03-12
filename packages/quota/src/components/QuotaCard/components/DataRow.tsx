import cn from 'classnames';
import { ReactNode } from 'react';

import { useLocale } from '@sbercloud/uikit-product-locale';
import { TruncateString } from '@snack-uikit/truncate-string';

import styles from '../styles.module.scss';

type DataRowProps = {
  label: string;
  value: number | ReactNode;
  className?: string;
};

export function DataRow({ value, label, className }: DataRowProps) {
  const { t } = useLocale('Quota');

  return (
    <div className={cn(styles.dataRow, className)}>
      <span className={styles.text}>
        <TruncateString text={label} maxLines={1} />
      </span>

      {typeof value === 'number' ? (
        <span className={styles.text}>
          {value} {t('peace')}
        </span>
      ) : (
        value
      )}
    </div>
  );
}
