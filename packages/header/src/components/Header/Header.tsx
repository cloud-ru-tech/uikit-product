import cn from 'classnames';
import { ReactNode } from 'react';

import { GLOBAL_CSS_COLOR } from '@sbercloud/uikit-product-theme';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import styles from './styles.module.scss';

export type HeaderProps = WithSupportProps<{
  children: ReactNode;
  className?: string;
}>;

export function Header({ children, className, ...rest }: HeaderProps) {
  return (
    <header
      style={{
        backgroundColor: `var(${GLOBAL_CSS_COLOR.NAVIGATION_BACKGROUND})`,
        borderColor: `var(${GLOBAL_CSS_COLOR.NAVIGATION_BORDER})`,
      }}
      className={cn(styles.header, className)}
      {...extractSupportProps(rest)}
    >
      {children}
    </header>
  );
}
