import { ReactNode } from 'react';

import { WithSupportProps } from '@sbercloud/uikit-product-utils';

import { Types } from './constants';

export type BadgeProps = WithSupportProps<{
  type?: Types;
  number?: number;
  disabled?: boolean;
  className?: string;
  isGroupMessage?: boolean;
  children: ReactNode;
}>;
