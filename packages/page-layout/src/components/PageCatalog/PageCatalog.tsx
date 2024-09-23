import cn from 'classnames';
import { PropsWithChildren } from 'react';

import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { Headline, HeadlineProps } from '../Headline';
import styles from './styles.module.scss';

export type PageCatalogProps = WithSupportProps<
  PropsWithChildren<
    Pick<HeadlineProps, 'title' | 'actions'> & {
      className?: string;
    }
  >
>;

export function PageCatalog({ children, title, actions, className, ...rest }: PageCatalogProps) {
  return (
    <div className={cn(styles.catalog, className)} {...extractSupportProps(rest)}>
      <Headline title={title} actions={actions} />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
