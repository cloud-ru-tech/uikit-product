import { PropsWithChildren } from 'react';

import { WithSupportProps } from '@sbercloud/uikit-product-utils';

import { Size, Variant } from './constants';

type DefaultContainerProps = {
  size?: Size;
  isOpen: boolean;
  className?: string;
  variant?: Variant;
  onClose(): void;
};

export type ContainerProps = PropsWithChildren<WithSupportProps<DefaultContainerProps>>;
