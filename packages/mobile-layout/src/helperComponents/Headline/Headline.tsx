import { ReactNode } from 'react';

import { ButtonSimple, ButtonSimpleProps } from '@snack-uikit/button';
import { Status, StatusProps } from '@snack-uikit/status';

import styles from './styles.module.scss';

export type HeadlineProps = {
  title: string;
  status?: Omit<StatusProps, 'size'>;
  prefixButton?: Omit<ButtonSimpleProps, 'label' | 'size'>;
  subHeader?: ReactNode;
};

export function Headline({ title, prefixButton, status, subHeader }: HeadlineProps) {
  return (
    <div className={styles.headline}>
      <div className={styles.titleLayout}>
        {prefixButton && (
          <div className={styles.prefixButtonWrapper}>
            <ButtonSimple {...prefixButton} size='s' />
          </div>
        )}

        <h1 className={styles.title}>{title}</h1>
      </div>

      {status && (
        <div className={styles.statusWrapper}>
          <Status {...status} size='s' />
        </div>
      )}

      {subHeader}
    </div>
  );
}
