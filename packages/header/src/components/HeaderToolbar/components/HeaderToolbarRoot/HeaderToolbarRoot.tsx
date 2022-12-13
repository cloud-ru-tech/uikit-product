import { ReactNode } from 'react';

import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import * as S from './styled';

export type HeaderToolbarRootProps = WithSupportProps<{
  isMobile?: boolean;
  children: ReactNode;
}>;

export function HeaderToolbarRoot({ isMobile, children, ...rest }: HeaderToolbarRootProps) {
  return (
    <S.Wrapper data-mobile={isMobile || undefined} {...extractSupportProps(rest)}>
      {children}
    </S.Wrapper>
  );
}
