import { WithSupportProps } from '@sbercloud/uikit-product-utils';

import { CounterType, Variant } from './constants';

export type CounterProps = WithSupportProps<{
  value: number;
  className?: string;
  type?: CounterType;
  variant?: Variant;
}>;
