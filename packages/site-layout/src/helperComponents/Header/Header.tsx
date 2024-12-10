import { ReactNode } from 'react';

import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

export type HeaderProps = WithSupportProps<{
  children: ReactNode;
  className?: string;
}>;

export function Header({ children, className, ...rest }: HeaderProps) {
  return (
    <header className={className} {...extractSupportProps(rest)}>
      {children}
    </header>
  );
}
