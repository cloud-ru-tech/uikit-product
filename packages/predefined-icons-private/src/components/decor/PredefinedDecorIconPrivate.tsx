import React, { ReactElement, cloneElement } from 'react';

import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-product-utils';

import { SIZES_IN_PX, Sizes } from './constants';
import { Wrapper } from './styled';

export type PredefinedDecorIconPrivateProps = WithSupportProps<{
  icon: ReactElement<{ size?: string | number }>;
  size?: Sizes;
  className?: string;
}>;

export function PredefinedDecorIconPrivate({
  icon,
  size = Sizes.Medium,
  className,
  ...rest
}: PredefinedDecorIconPrivateProps) {
  const { iconSize } = SIZES_IN_PX[size];

  return (
    <Wrapper className={className} data-size={size} {...extractSupportProps(rest)}>
      {cloneElement(icon, { size: iconSize })}
    </Wrapper>
  );
}

PredefinedDecorIconPrivate.sizes = Sizes;
