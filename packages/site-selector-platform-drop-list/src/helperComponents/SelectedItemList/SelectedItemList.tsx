import { Typography } from '@snack-uikit/typography';

import { Item } from '../../types';
import styles from './styles.module.scss';

type SelectedItemListProps = {
  baseTitle: string;
  value: Array<Item>;
  lengthDroplist: number;
};

export function SelectedItemList({ baseTitle, value, lengthDroplist }: SelectedItemListProps) {
  if (value.length === 0 || value.length === lengthDroplist) {
    return <Typography.SansTitleS className={styles.text}>{baseTitle}</Typography.SansTitleS>;
  }

  if (value.length === 1) {
    return <Typography.SansTitleS className={styles.text}>{value[0]?.title}</Typography.SansTitleS>;
  }

  return (
    <div className={styles.container}>
      {value.map(({ title, icon: IconComponent }, index) => (
        <div key={title} className={styles.item}>
          {IconComponent && <IconComponent size={12} className={styles.icon} />}
          <Typography.SansLabelM className={styles.text}>
            {`${title}${index !== value.length - 1 ? ',' : ''}`}
          </Typography.SansLabelM>
        </div>
      ))}
    </div>
  );
}
