import cn from 'classnames';
import { PropsWithChildren, ReactNode } from 'react';

import { Headline, HeadlineProps } from '../Headline';
import { PrivateSidebar, PrivateSidebarProps } from '../PrivateSidebar';
import styles from './styles.module.scss';

export type PageServicesProps = PropsWithChildren<
  Pick<HeadlineProps, 'title' | 'actions'> & {
    className?: string;
    sidebar?: PrivateSidebarProps;
    /** Временный слот для крошек до переезда на целевую историю в хедере */
    tempTopSlot?: ReactNode;
  }
>;

export function PageServices({ children, title, actions, className, sidebar, tempTopSlot }: PageServicesProps) {
  return (
    <div className={cn(styles.wrapper, className)}>
      <div className={styles.tempContainer}>
        <div className={styles.container}>
          <div>
            {tempTopSlot}
            <Headline title={title} actions={actions} />
          </div>
          <div className={styles.childWrapper}>{children}</div>
        </div>
      </div>
      {sidebar && (
        <div className={styles.sidebar}>
          <PrivateSidebar {...sidebar} />
        </div>
      )}
    </div>
  );
}
