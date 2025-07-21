import cn from 'classnames';
import { ReactNode } from 'react';

import { TruncateString } from '@snack-uikit/truncate-string';

import styles from '../styles.module.scss';

type DataRowProps = {
  label: ReactNode;
  value: number | ReactNode;
  className?: string;
  unit: string;
};

export function DataRow({ value, label, className, unit }: DataRowProps) {
  return (
    <div className={cn(styles.dataRow, className)}>
      <span className={styles.text}>
        {typeof label === 'string' ? <TruncateString text={label} maxLines={1} /> : label}
      </span>

      {typeof value === 'number' ? (
        <span className={styles.text}>
          {value} {unit}
        </span>
      ) : (
        value
      )}
    </div>
  );
}
