import { ReactNode } from 'react';

import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-product-utils';

import { Wrapper } from './styled';

export type HeaderLogoProps = WithSupportProps<{
  children: ReactNode;
}>;

export function HeaderLogo({ children, ...rest }: HeaderLogoProps) {
  return <Wrapper {...extractSupportProps(rest)}>{children}</Wrapper>;
}
