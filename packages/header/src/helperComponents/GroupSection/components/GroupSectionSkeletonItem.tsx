import { Skeleton } from '@snack-uikit/skeleton';

import styles from '../styles.module.scss';

export function GroupSectionSkeletonItem() {
  return (
    <div className={styles.skeletonItem}>
      <Skeleton loading className={styles.skeletonIcon} />

      <Skeleton loading />
    </div>
  );
}
