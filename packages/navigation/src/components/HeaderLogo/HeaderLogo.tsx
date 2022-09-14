import { MouseEvent, ReactNode } from 'react';

import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { Wrapper } from './styled';

export type HeaderLogoProps = WithSupportProps<{
  children: ReactNode;
  href: string;
  onClick?(e?: MouseEvent<HTMLAnchorElement>): void;
}>;

export function HeaderLogo({ children, onClick, href, ...rest }: HeaderLogoProps) {
  return (
    <Wrapper onClick={onClick} href={href} target={'_self'} {...extractSupportProps(rest)}>
      {children}
    </Wrapper>
  );
}
