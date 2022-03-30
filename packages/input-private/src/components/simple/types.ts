import { ChangeEvent, RefAttributes } from 'react';

import { WithSupportProps } from '@sbercloud/uikit-utils';

import { Sizes, Types } from './constants';

export type SimpleInputProps = RefAttributes<HTMLInputElement> &
  WithSupportProps<{
    value: string;
    onChange(value: string, e?: ChangeEvent<HTMLInputElement>): void;
    onFocus?(e: ChangeEvent<HTMLInputElement>): void;
    onBlur?(e: ChangeEvent<HTMLInputElement>): void;
    className?: string;
    placeholder?: string;
    size?: Sizes;
    type?: Types;
    disabled?: boolean;
    error?: boolean;
    autoFocus?: boolean;
    autoComplete?: boolean;
    moreButton?: {
      onClick(): void;
      tooltipText?: string;
    };
    maxLength?: number;
  }>;
