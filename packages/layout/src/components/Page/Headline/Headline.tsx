import { ReactNode } from 'react';

import { Typography } from '@snack-uikit/typography';

import styles from './styles.module.scss';

export type HeadlineProps = {
  title: string;
  actions?: ReactNode;
};

export function Headline({ title, actions }: HeadlineProps) {
  return (
    <div className={styles.headline}>
      <Typography.SansHeadlineM className={styles.title}>{title}</Typography.SansHeadlineM>
      {Boolean(actions) && <div className={styles.actions}>{actions}</div>}
    </div>
  );
}
