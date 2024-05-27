import cn from 'classnames';
import { ReactNode } from 'react';

import { useLanguage } from '@sbercloud/uikit-product-utils';
import { TruncateString } from '@snack-uikit/truncate-string';

import { textProvider, Texts } from '../../../helpers';
import styles from '../styles.module.scss';

type DataRowProps = {
  label: string;
  value: number | ReactNode;
  className?: string;
};

export function DataRow({ value, label, className }: DataRowProps) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  return (
    <div className={cn(styles.dataRow, className)}>
      <span className={styles.text}>
        <TruncateString text={label} maxLines={1} />
      </span>

      {typeof value === 'number' ? (
        <span className={styles.text}>
          {value} {textProvider(languageCode, Texts.Peace)}
        </span>
      ) : (
        value
      )}
    </div>
  );
}
