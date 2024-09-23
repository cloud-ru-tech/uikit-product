import { ReactNode } from 'react';

import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import styles from './styles.module.scss';

export type HeadlineProps = WithSupportProps<{
  title: string;
  beforeHeadline?: ReactNode;
  afterHeadline?: ReactNode;
  actions?: ReactNode;
  subHeader?: ReactNode;
}>;

export function Headline({ title, actions, beforeHeadline, afterHeadline, subHeader, ...rest }: HeadlineProps) {
  return (
    <div className={styles.headline} {...extractSupportProps(rest)}>
      <div className={styles.headlineLayout}>
        <div className={styles.titleLayout}>
          {beforeHeadline && <div className={styles.prefixButtonWrapper}>{beforeHeadline}</div>}

          <h1 className={styles.title}>{title}</h1>

          {afterHeadline && <div className={styles.statusWrapper}>{afterHeadline}</div>}
        </div>

        {Boolean(actions) && <div className={styles.actions}>{actions}</div>}
      </div>

      {subHeader && <div className={styles.subHeader}>{subHeader}</div>}
    </div>
  );
}
