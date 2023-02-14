import { MouseEventHandler } from 'react';

import { WithSupportProps } from '@sbercloud/uikit-product-utils';

export enum Variants {
  Fixed = 'Fixed',
  Absolute = 'Absolute',
}

type OverlayPrivateOwnProps = {
  variant?: Variants;
  onClick: MouseEventHandler;
  className?: string;
  hasBlur?: boolean;
};

export type OverlayPrivateProps = WithSupportProps<OverlayPrivateOwnProps>;
