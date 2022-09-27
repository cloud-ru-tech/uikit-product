import { ChangeEvent, FocusEventHandler, ReactNode, RefAttributes } from 'react';

import { WithSupportProps } from '@sbercloud/uikit-product-utils';

import { Types } from './constants';

export type InputPrivateProps = RefAttributes<HTMLInputElement> &
  WithSupportProps<{
    name?: string;
    value: string;
    onChange?(value: string, e?: ChangeEvent<HTMLInputElement>): void;
    id?: string;
    className?: string;
    placeholder?: string;
    type?: Types;
    disabled?: boolean;
    autoComplete?: boolean;
    maxLength?: number;
    onFocus?: FocusEventHandler<HTMLInputElement>;
    onBlur?: FocusEventHandler<HTMLInputElement>;
    prefix?: ReactNode;
    postfix?: ReactNode;
  }>;
