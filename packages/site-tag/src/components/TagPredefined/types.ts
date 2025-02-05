import { ValueOf } from '@snack-uikit/utils';

import { TagSpecialProps } from '../../helperComponents';
import { VARIANT } from './constants';

export type Variant = ValueOf<typeof VARIANT>;

export type TagProps =
  | (Pick<TagSpecialProps, 'text' | 'tip'> & {
      appearance?: TagSpecialProps['appearance'];
    })
  | null;

export type TagPredefinedCommonProps = {
  className?: string;
  size: TagSpecialProps['size'];
  variant: Variant;
};
