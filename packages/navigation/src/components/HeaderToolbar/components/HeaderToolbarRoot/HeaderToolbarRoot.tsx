import { ReactNode } from 'react';

import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-product-utils';

import { Wrapper } from './styled';

export type HeaderToolbarRootProps = WithSupportProps<{
  children: ReactNode;
}>;

export function HeaderToolbarRoot({ children, ...rest }: HeaderToolbarRootProps) {
  return <Wrapper {...extractSupportProps(rest)}>{children}</Wrapper>;
}
