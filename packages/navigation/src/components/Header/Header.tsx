import { ReactNode } from 'react';

import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { Wrapper } from './styled';

export type HeaderProps = WithSupportProps<{
  children: ReactNode;
  className?: string;
}>;

export function Header({ children, className, ...rest }: HeaderProps) {
  return (
    <Wrapper className={className} {...extractSupportProps(rest)}>
      {children}
    </Wrapper>
  );
}
