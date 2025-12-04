import cn from 'classnames';
import { ReactNode } from 'react';

import { extractSupportProps, WithLayoutType, WithSupportProps } from '@sbercloud/uikit-product-utils';

import styles from './styles.module.scss';

export type MainProps = WithSupportProps<
  WithLayoutType<{
    children: ReactNode;
    className?: string;
  }>
>;

export function Main({ children, className, layoutType, ...rest }: MainProps) {
  return (
    <main className={cn(styles.main, className)} {...extractSupportProps(rest)}>
      <div className={styles.mainContent} data-layout-type={layoutType}>
        {children}
      </div>
    </main>
  );
}
