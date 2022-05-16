import { WithSupportProps } from '@sbercloud/uikit-product-utils';

import { CounterTypes } from '../../helpers/types';

export type CounterProps = WithSupportProps<{ value: number; className?: string; type?: CounterTypes }>;
