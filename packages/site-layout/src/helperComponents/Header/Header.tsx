import { CSSProperties, ReactNode } from 'react';

import { extractDataProps, extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

export type HeaderProps = WithSupportProps<{
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}>;

export function Header({ children, className, style, ...rest }: HeaderProps) {
  return (
    <header className={className} {...extractSupportProps(rest)} {...extractDataProps(rest)} style={style}>
      {children}
    </header>
  );
}
