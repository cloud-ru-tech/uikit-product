import { Skeleton, SkeletonText } from '@snack-uikit/skeleton';

import styles from './styles.module.scss';

export function NoteItemSkeleton() {
  return (
    <div className={styles.noteItemSkeletonWrapper}>
      <div className={styles.noteItemTextSkeleton}>
        <SkeletonText lines={1} className={styles.noteItemHeaderSkeleton} />
        <SkeletonText lines={6} />
        <SkeletonText lines={4} />
      </div>
      <div className={styles.noteItemIllustrationSkeletonWrapper}>
        <Skeleton width={380} height={380} borderRadius={8} />
      </div>
    </div>
  );
}
