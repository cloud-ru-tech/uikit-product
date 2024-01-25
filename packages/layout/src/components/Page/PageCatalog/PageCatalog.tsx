import cn from 'classnames';
import { PropsWithChildren } from 'react';

import { Headline, HeadlineProps } from '../Headline';
import styles from './styles.module.scss';

export type PageCatalogProps = PropsWithChildren<
  Pick<HeadlineProps, 'title' | 'actions'> & {
    className?: string;
  }
>;

export function PageCatalog({ children, title, actions, className }: PageCatalogProps) {
  return (
    <div className={cn(styles.catalog, className)}>
      <Headline title={title} actions={actions} />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
