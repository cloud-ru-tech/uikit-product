import cn from 'classnames';
import { ReactNode } from 'react';

import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import styles from './styles.module.scss';

export type HeaderProps = WithSupportProps<{
  children: ReactNode;
  className?: string;
}>;

export function Header({ children, className, ...rest }: HeaderProps) {
  return (
    <header className={cn(styles.header, className)} {...extractSupportProps(rest)}>
      {children}
    </header>
  );
}
