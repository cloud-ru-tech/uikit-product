import { MouseEventHandler } from 'react';

import { WithSupportProps } from '@sbercloud/uikit-utils';

export enum Variants {
  Fixed = 'Fixed',
  Absolute = 'Absolute',
}

type OverlayPrivateOwnProps = {
  variant?: Variants;
  onClick: MouseEventHandler;
  className?: string;
};

export type OverlayPrivateProps = WithSupportProps<OverlayPrivateOwnProps>;
