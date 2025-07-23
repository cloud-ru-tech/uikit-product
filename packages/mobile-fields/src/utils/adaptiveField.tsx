import { ComponentType, forwardRef, RefAttributes } from 'react';

import { WithLayoutType } from '@sbercloud/uikit-product-utils';

export function getAdaptiveFieldProps<T extends WithLayoutType<{ autoFocus?: boolean }>>({ layoutType, autoFocus }: T) {
  const isMobile = layoutType === 'mobile';

  return {
    autoFocus: isMobile ? false : autoFocus,
  };
}

export function withAdaptiveField<TProps extends { autoFocus?: boolean }, TRef = undefined>(
  Component: ComponentType<TProps & RefAttributes<TRef>>,
) {
  return forwardRef<TRef, WithLayoutType<TProps>>(function WithAdaptiveField(props, ref) {
    return <Component {...props} {...getAdaptiveFieldProps(props)} ref={ref} />;
  });
}
