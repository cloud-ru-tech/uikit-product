import { WithSupportProps } from '@sbercloud/uikit-utils';

import { Types } from '../../helpers';

export type StatusBadgeProps = WithSupportProps<{
  type: Types;
  className?: string;
}>;
