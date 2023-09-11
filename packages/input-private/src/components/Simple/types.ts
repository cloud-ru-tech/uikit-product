import { ChangeEvent, FocusEventHandler, RefAttributes } from 'react';

import { WithSupportProps } from '@sbercloud/uikit-product-utils';

import { Sizes, Types } from './constants';

export type SimpleInputProps = RefAttributes<HTMLInputElement> &
  WithSupportProps<{
    name?: string;
    value: string;
    onChange(value: string, e?: ChangeEvent<HTMLInputElement>): void;
    onFocus?: FocusEventHandler<HTMLInputElement>;
    onBlur?: FocusEventHandler<HTMLInputElement>;
    id?: string;
    className?: string;
    placeholder?: string;
    size?: Sizes;
    type?: Types;
    disabled?: boolean;
    error?: boolean;
    autoComplete?: boolean | string;
    ellipsis?: boolean;
    prefix?: string;
    hideClearButton?: boolean;
    moreButton?: {
      onClick(): void;
      tooltipText?: string;
    };
    maxLength?: number;
  }>;
