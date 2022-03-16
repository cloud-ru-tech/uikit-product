import { WithSupportProps } from '@sbercloud/uikit-utils';

import { Sizes, Types } from '../../helpers';

export type StatusBadgeProps = WithSupportProps<{
  type: Types;
  size?: Sizes;
  className?: string;
}>;
