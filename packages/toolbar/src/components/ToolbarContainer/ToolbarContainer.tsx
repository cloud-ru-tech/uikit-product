import { ReactNode } from 'react';

import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-product-utils';

import { ToolbarContainerStyled } from './styled';

export type ToolbarContainerProps = {
  className?: string;
  children: ReactNode;
};

export function ToolbarContainer({ className, children, ...rest }: WithSupportProps<ToolbarContainerProps>) {
  return (
    <ToolbarContainerStyled className={className} {...extractSupportProps(rest)}>
      {children}
    </ToolbarContainerStyled>
  );
}
