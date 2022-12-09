import { ReactNode } from 'react';

import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { Wrapper } from './styled';

export type HeaderToolbarRootProps = WithSupportProps<{
  isMobile?: boolean;
  children: ReactNode;
}>;

export function HeaderToolbarRoot({ isMobile, children, ...rest }: HeaderToolbarRootProps) {
  return (
    <Wrapper data-mobile={isMobile || undefined} {...extractSupportProps(rest)}>
      {children}
    </Wrapper>
  );
}
