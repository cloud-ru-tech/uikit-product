import { WithSupportProps } from '@sbercloud/uikit-product-utils';

export enum CounterType {
  Count = 'count',
  Notify = 'notify',
}

export type CounterProps = WithSupportProps<{ value: number; className?: string; type?: CounterType }>;
