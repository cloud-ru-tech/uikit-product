import { ChangeEvent, FocusEvent, RefAttributes } from 'react';

import { WithSupportProps } from '@sbercloud/uikit-product-utils';

export type TextareaPrivateProps = RefAttributes<HTMLTextAreaElement> &
  WithSupportProps<{
    name?: string;
    value: string;
    onChange?: (value: string, e?: ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    className?: string;
    minRows?: number;
    maxRows?: number;
    disabled?: boolean;
    maxLength?: number;
    autosize?: boolean;
    onFocus?: () => void;
    onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void;
  }>;
