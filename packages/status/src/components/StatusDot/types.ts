import { WithSupportProps } from '@sbercloud/uikit-product-utils';

import { Sizes, Types } from '../../helpers';

export type StatusDotProps = WithSupportProps<{
  type: Types;
  size?: Sizes;
  className?: string;
}>;
