import { IconSelector } from '../../types';
import styles from './styles.module.scss';

type IconItemListProps = {
  icon: IconSelector;
};

export function IconItemList({ icon: IconComponent }: IconItemListProps) {
  return (
    <div className={styles.container}>
      <IconComponent size={24} className={styles.icon} />
    </div>
  );
}
