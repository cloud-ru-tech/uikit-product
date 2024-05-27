import { ReactNode } from 'react';

import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { WithSkeleton } from '@snack-uikit/skeleton';
import { TruncateString } from '@snack-uikit/truncate-string';

import styles from '../styles.module.scss';
import { DataSkeleton } from './DataSkeleton';

type QuotaCardLayoutProps = WithSupportProps<{
  loading?: boolean;
  title: string;
  exceeded?: boolean;
  children?: ReactNode;
}>;

export function QuotaCardLayout({ title, exceeded, loading, children, ...rest }: QuotaCardLayoutProps) {
  return (
    <div className={styles.quotaCard} data-exceeded={exceeded || undefined} {...extractSupportProps(rest)}>
      <span className={styles.title}>
        <TruncateString text={title} maxLines={1} />
      </span>

      <WithSkeleton loading={loading} skeleton={<DataSkeleton />}>
        <div className={styles.dataWrapper}>{children}</div>
      </WithSkeleton>
    </div>
  );
}
