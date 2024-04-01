import { forwardRef, ReactNode } from 'react';

import styles from './styles.modules.scss';

type GroupCardProps = {
  id: string;
  title: string;
  children: ReactNode;
  mobile?: boolean;
};

export const GroupCard = forwardRef<HTMLDivElement, GroupCardProps>(({ id, title, children, mobile }, ref) => (
  <div className={styles.card} id={id} ref={ref} data-test-id={`header__drawer-menu__group-card-${id}`}>
    <span className={styles.cardTitle}>{title}</span>

    <div className={styles.cardBody} data-mobile={mobile || undefined}>
      {children}
    </div>
  </div>
));
