import { PropsWithChildren } from 'react';

import { WithSupportProps } from '@sbercloud/uikit-product-utils';

import { Size, Variant } from './constants';

type DefaultContainerProps = {
  size?: Size;
  isOpen: boolean;
  className?: string;
};

type BaseVariantContainerProps = {
  variant?: Exclude<Variant, Variant.Forced>;
  onClose(): void;
};

type ForcedVariantContainerProps = {
  variant?: Variant.Forced;
};

export type ContainerProps = PropsWithChildren<
  WithSupportProps<DefaultContainerProps & (BaseVariantContainerProps | ForcedVariantContainerProps)>
>;
