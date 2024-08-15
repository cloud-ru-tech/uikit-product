import { ReactNode } from 'react';

import styles from './styles.module.scss';

export type HeadlineProps = {
  title: string;
  beforeHeadline?: ReactNode;
  afterHeadline?: ReactNode;
  subHeader?: ReactNode;
};

export function Headline({ title, beforeHeadline, afterHeadline, subHeader }: HeadlineProps) {
  return (
    <div className={styles.headline}>
      <div className={styles.titleLayout}>
        {beforeHeadline && <div className={styles.prefixButtonWrapper}>{beforeHeadline}</div>}

        <h1 className={styles.title}>{title}</h1>
      </div>

      {afterHeadline && <div className={styles.statusWrapper}>{afterHeadline}</div>}

      {subHeader && <div className={styles.subHeader}>{subHeader}</div>}
    </div>
  );
}
