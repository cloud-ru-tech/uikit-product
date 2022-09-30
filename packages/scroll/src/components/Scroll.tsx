import 'overlayscrollbars/css/OverlayScrollbars.css';

import { cx } from '@linaria/core';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { forwardRef, ReactNode, useImperativeHandle, useRef } from 'react';

import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { BarHideStrategy, Sizes, Variants } from './constants';
import * as S from './styled';

export type ScrollProps = {
  children: ReactNode;
  size?: Sizes;
  variant?: Variants;
  flexbox?: boolean;
  onScroll?: (event?: UIEvent) => void;
  barHideStrategy?: BarHideStrategy;
  className?: string;
};

const ScrollComponent = forwardRef<HTMLElement, WithSupportProps<ScrollProps>>(
  (
    {
      children,
      variant = Variants.Primary,
      size = Sizes.Medium,
      flexbox = false,
      onScroll,
      barHideStrategy = BarHideStrategy.Leave,
      className,
      ...rest
    },
    ref,
  ) => {
    const overlayScrollbarsRef = useRef<OverlayScrollbarsComponent>(null);

    useImperativeHandle<HTMLElement | null, HTMLElement | null>(
      ref,
      () => (overlayScrollbarsRef.current?.osInstance()?.getElements('viewport') ?? null) as HTMLElement | null,
    );

    return (
      <OverlayScrollbarsComponent
        data-variant={variant}
        data-size={size}
        className={cx(S.scrollClassName, className, flexbox && 'os-host-flexbox')}
        options={{
          callbacks: {
            onScroll,
          },
          scrollbars: {
            autoHide: barHideStrategy,
            autoHideDelay: 100,
          },
        }}
        ref={overlayScrollbarsRef}
        {...extractSupportProps(rest)}
      >
        {children}
      </OverlayScrollbarsComponent>
    );
  },
);

export const Scroll = ScrollComponent as typeof ScrollComponent & {
  variants: typeof Variants;
  sizes: typeof Sizes;
  barHideStrategies: typeof BarHideStrategy;
};

Scroll.variants = Variants;
Scroll.sizes = Sizes;
Scroll.barHideStrategies = BarHideStrategy;
