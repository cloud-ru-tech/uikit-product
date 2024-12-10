import cn from 'classnames';
import { ReactNode } from 'react';

import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import styles from './styles.module.scss';

export type MainProps = WithSupportProps<{
  children: ReactNode;
  className?: string;
}>;

export function Main({ children, className, ...rest }: MainProps) {
  return (
    <main className={cn(styles.main, className)} {...extractSupportProps(rest)}>
      {children}
    </main>
  );
}
