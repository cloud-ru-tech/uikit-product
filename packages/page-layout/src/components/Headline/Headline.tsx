import { ReactNode } from 'react';

import styles from './styles.module.scss';

export type HeadlineProps = {
  title: string;
  actions?: ReactNode;
};

export function Headline({ title, actions }: HeadlineProps) {
  return (
    <div className={styles.headline}>
      <h1 className={styles.title}>{title}</h1>
      {Boolean(actions) && <div className={styles.actions}>{actions}</div>}
    </div>
  );
}
