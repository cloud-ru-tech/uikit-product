import { forwardRef } from 'react';

import { InputDecoratorPrivate, InputDecoratorPrivateProps } from '@sbercloud/uikit-react-input-decorator-private';
import { SimpleTextarea, SimpleTextareaProps } from '@sbercloud/uikit-react-textarea-private';
import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-utils';

export type TextareaProps = Omit<InputDecoratorPrivateProps, 'children'> &
  Omit<SimpleTextareaProps, 'error' | 'autosize'> & {
    error?: string;
  };

export const Textarea = forwardRef<HTMLTextAreaElement, WithSupportProps<TextareaProps>>(
  (
    {
      className,
      label,
      labelTooltip,
      hint,
      value,
      onChange,
      placeholder,
      minRows,
      maxRows,
      maxLength,
      error,
      disabled = false,
      optional = false,
      ...rest
    },
    ref,
  ) => {
    const length = maxLength ? { current: value.length, max: maxLength } : undefined;

    return (
      <InputDecoratorPrivate
        className={className}
        length={length}
        error={error}
        optional={optional}
        label={label}
        labelTooltip={labelTooltip}
        hint={hint}
        {...extractSupportProps(rest)}
      >
        <SimpleTextarea
          ref={ref}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          error={Boolean(error)}
          minRows={minRows}
          maxRows={maxRows}
          disabled={disabled}
          maxLength={maxLength}
        />
      </InputDecoratorPrivate>
    );
  },
);
