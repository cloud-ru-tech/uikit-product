import pick from 'lodash.pick';

import { extractDataProps, extractSupportProps } from '@sbercloud/uikit-product-utils';

import { CommonButtonProps } from '../types';

export function extractCommonButtonProps<T extends CommonButtonProps>(props: T) {
  return {
    ...pick<CommonButtonProps>(props, ['id', 'className', 'type', 'disabled', 'onClick', 'href', 'target', 'tabIndex']),
    ...extractSupportProps(props as Record<string, unknown>),
    ...extractDataProps(props as Record<string, unknown>),
  };
}
