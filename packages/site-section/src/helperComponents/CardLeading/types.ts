import { WithSupportProps } from '@sbercloud/uikit-product-utils';
import { ValueOf } from '@snack-uikit/utils';

import { TYPE } from './constants';

export type Type = ValueOf<typeof TYPE>;

export type CardLeadingItem = WithSupportProps<{
  /** Область, сфера лидерства */
  type: Type;
}>;
