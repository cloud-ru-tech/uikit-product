import { ChangeEvent, FocusEventHandler, ReactNode, RefAttributes } from 'react';

import { WithSupportProps } from '@sbercloud/uikit-utils';

import { Types } from './constants';

export type InputPrivateProps = RefAttributes<HTMLInputElement> &
  WithSupportProps<{
    value: string;
    onChange?(value: string, e?: ChangeEvent<HTMLInputElement>): void;
    className?: string;
    placeholder?: string;
    type?: Types;
    disabled?: boolean;
    autoFocus?: boolean;
    autoComplete?: boolean;
    maxLength?: number;
    onFocus?: FocusEventHandler<HTMLInputElement>;
    onBlur?: FocusEventHandler<HTMLInputElement>;
    postfix?: ReactNode;
  }>;
