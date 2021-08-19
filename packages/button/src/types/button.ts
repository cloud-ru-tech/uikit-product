import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import { WithSupportProps } from '@sbercloud/uikit-utils';

export type CommonButtonProps = WithSupportProps<
  Pick<
    DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    'id' | 'className' | 'type' | 'disabled' | 'onClick' | 'title'
  >
>;
