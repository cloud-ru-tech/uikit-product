import { CSSProperties, ReactNode } from 'react';

import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

export type HeaderProps = WithSupportProps<{
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}>;

export function Header({ children, className, style, ...rest }: HeaderProps) {
  return (
    <header className={className} {...extractSupportProps(rest)} style={style}>
      {children}
    </header>
  );
}
