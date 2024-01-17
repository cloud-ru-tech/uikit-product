import { forwardRef, ReactNode } from 'react';

import styles from './styles.modules.scss';

type GroupCardProps = {
  id: string;
  title: string;
  children: ReactNode;
};

export const GroupCard = forwardRef<HTMLDivElement, GroupCardProps>(({ id, title, children }, ref) => (
  <div className={styles.card} id={id} ref={ref}>
    <span className={styles.cardTitle}>{title}</span>

    <div className={styles.cardBody}>{children}</div>
  </div>
));
