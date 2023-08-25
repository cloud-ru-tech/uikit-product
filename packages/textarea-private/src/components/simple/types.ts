import { ChangeEvent, FocusEvent, RefAttributes } from 'react';

import { WithSupportProps } from '@sbercloud/uikit-product-utils';

export type SimpleTextareaProps = RefAttributes<HTMLTextAreaElement> &
  WithSupportProps<{
    name?: string;
    value: string;
    onChange(value: string, e?: ChangeEvent<HTMLTextAreaElement>): void;
    onBlur?(e?: FocusEvent<HTMLTextAreaElement>): void;
    className?: string;
    placeholder?: string;
    minRows?: number;
    maxRows?: number;
    disabled?: boolean;
    maxLength?: number;
    autosize?: boolean;
    error?: boolean;
    withClearButton?: boolean;
  }>;
