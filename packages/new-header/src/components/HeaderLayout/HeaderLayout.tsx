import cn from 'classnames';
import { ReactNode } from 'react';

import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import styles from './styles.module.scss';

export type HeaderLayoutProps = WithSupportProps<{
  className?: string;
  menu?: ReactNode;
  logo?: ReactNode;
  select?: ReactNode;
  breadcrumbs?: ReactNode;
  toolbar?: ReactNode;
  isMobile?: boolean;
}>;

export function HeaderLayout({
  menu,
  logo,
  select,
  breadcrumbs,
  toolbar,
  className,
  isMobile,
  ...rest
}: HeaderLayoutProps) {
  return (
    <header className={cn(styles.header, className)} {...extractSupportProps(rest)}>
      <div className={styles.top}>
        <div className={styles.left}>
          {menu}

          {logo}

          {!isMobile && select}
          {!isMobile && breadcrumbs}
        </div>

        <div className={styles.right}>{toolbar}</div>
      </div>

      {isMobile && Boolean(breadcrumbs) && <div className={styles.bottom}>{breadcrumbs}</div>}
    </header>
  );
}
