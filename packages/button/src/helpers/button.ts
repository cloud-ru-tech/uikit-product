import pick from 'lodash.pick';

import { extractDataProps, extractSupportProps } from '@sbercloud/uikit-utils';

import { CommonButtonProps } from '../types';

export function extractCommonButtonProps<T extends CommonButtonProps>(props: T) {
  return {
    ...pick<CommonButtonProps>(props, ['id', 'className', 'type', 'disabled', 'onClick']),
    ...extractSupportProps(props),
    ...extractDataProps(props),
  };
}
