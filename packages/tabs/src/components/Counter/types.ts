import { WithSupportProps } from '@sbercloud/uikit-utils';

import { CounterTypes } from '../../helpers/types';

export type CounterProps = WithSupportProps<{ value: number; className?: string; type?: CounterTypes }>;
