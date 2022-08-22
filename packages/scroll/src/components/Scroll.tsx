import 'overlayscrollbars/css/OverlayScrollbars.css';

import { cx } from '@linaria/core';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { ReactNode } from 'react';

import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { Sizes, Variants } from './constants';
import * as S from './styled';

export type ScrollProps = {
  children: ReactNode;
  size?: Sizes;
  variant?: Variants;
  flexbox?: boolean;
  onScroll?: (event?: UIEvent) => void;
};

export function Scroll({
  children,
  variant = Variants.Primary,
  size = Sizes.Medium,
  flexbox = false,
  onScroll,
  ...rest
}: WithSupportProps<ScrollProps>) {
  return (
    <OverlayScrollbarsComponent
      data-variant={variant}
      data-size={size}
      className={cx(S.scrollClassName, flexbox && 'os-host-flexbox')}
      options={{
        paddingAbsolute: true,
        callbacks: { onScroll },
      }}
      {...extractSupportProps(rest)}
    >
      {children}
    </OverlayScrollbarsComponent>
  );
}

Scroll.variants = Variants;
Scroll.sizes = Sizes;
