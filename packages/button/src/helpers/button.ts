import pick from 'lodash.pick';

import { extractSupportProps } from '@sbercloud/uikit-utils';

import { CommonButtonProps } from '../types';

export function extractCommonButtonProps<T extends CommonButtonProps>(props: T) {
  return {
    ...pick<CommonButtonProps>(props, ['className', 'type', 'disabled', 'onClick', 'title']),
    ...extractSupportProps(props),
  };
}
