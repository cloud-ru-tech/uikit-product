import { ChangeEvent, RefAttributes } from 'react';

import { WithSupportProps } from '@sbercloud/uikit-utils';

export type SimpleTextareaProps = RefAttributes<HTMLTextAreaElement> &
  WithSupportProps<{
    value: string;
    onChange(value: string, e?: ChangeEvent<HTMLTextAreaElement>): void;
    className?: string;
    placeholder?: string;
    minRows?: number;
    maxRows?: number;
    disabled?: boolean;
    maxLength?: number;
    autosize?: boolean;
    error?: boolean;
  }>;
