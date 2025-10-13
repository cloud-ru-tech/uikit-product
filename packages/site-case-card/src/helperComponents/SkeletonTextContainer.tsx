import { Skeleton } from '@snack-uikit/skeleton';

import styles from './styles.module.scss';

export function SkeletonTextContainer() {
  return (
    <div className={styles.root}>
      <Skeleton loading width={124} className={styles.skeletonItems} />
      <Skeleton loading className={styles.skeletonTitle} />
      <Skeleton loading width={200} className={styles.skeletonText} />
    </div>
  );
}
