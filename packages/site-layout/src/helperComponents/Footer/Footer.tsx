import cn from 'classnames';
import { ReactNode } from 'react';

import { extractSupportProps, WithLayoutType, WithSupportProps } from '@cloud-ru/uikit-product-utils';

import styles from './styles.module.scss';

export type FooterProps = WithSupportProps<
  WithLayoutType<{
    children: ReactNode;
    className?: string;
  }>
>;

export function Footer({ children, className, layoutType, ...rest }: FooterProps) {
  return (
    <footer className={cn(styles.footer, className)} data-layout-type={layoutType} {...extractSupportProps(rest)}>
      {children}
    </footer>
  );
}
