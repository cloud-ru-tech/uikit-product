import { SkeletonText } from '@snack-uikit/skeleton';

import styles from '../styles.module.scss';

export function DataSkeleton() {
  return (
    <div className={styles.dataWrapper}>
      <SkeletonText lines={1} className={styles.text} />
      <SkeletonText lines={1} className={styles.text} />
    </div>
  );
}
