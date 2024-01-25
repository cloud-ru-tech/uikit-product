import cn from 'classnames';
import { PropsWithChildren, ReactNode } from 'react';

import { Headline, HeadlineProps } from '../Headline';
import styles from './styles.module.scss';

export type PageServicesProps = PropsWithChildren<
  Pick<HeadlineProps, 'title' | 'actions'> & {
    className?: string;
    sidebar: ReactNode;
  }
>;

export function PageServices({ children, title, actions, className, sidebar }: PageServicesProps) {
  return (
    <div className={cn(styles.wrapper, className)}>
      {Boolean(sidebar) && <div className={styles.sidebar}>{sidebar}</div>}
      <div className={styles.container}>
        <Headline title={title} actions={actions} />
        <div>{children}</div>
      </div>
    </div>
  );
}
