import { Skeleton, SkeletonText } from '@snack-uikit/skeleton';

import styles from './styles.module.scss';

export function NoteItemMobileSkeleton() {
  return (
    <div className={styles.noteItemSkeletonWrapper}>
      <Skeleton height={380} borderRadius={8} />
      <div className={styles.noteItemContentSkeletonWrapper}>
        <SkeletonText lines={1} className={styles.noteItemHeaderSkeleton} />
        <SkeletonText lines={6} />
      </div>
    </div>
  );
}
