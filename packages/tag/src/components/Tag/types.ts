import { MouseEventHandler, ReactText } from 'react';

import { WithSupportProps } from '@sbercloud/uikit-product-utils';

import { Colors, Sizes } from '../../constants';

export type TagProps = WithSupportProps<{
  color: Colors;
  value: ReactText;
  className?: string;
  size?: Sizes;
  onRemoveClick?: MouseEventHandler<HTMLElement>;
}>;
