import { Typography } from '@snack-uikit/typography';

import styles from './styles.module.scss';

type ContentItemListProps = {
  title: string;
};

export function ContentItemList({ title }: ContentItemListProps) {
  return (
    <div className={styles.container}>
      <Typography.SansTitleS>{title}</Typography.SansTitleS>
    </div>
  );
}
