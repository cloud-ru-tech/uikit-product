import { forwardRef } from 'react';

import { InputDecoratorPrivate, InputDecoratorPrivateProps } from '@sbercloud/uikit-product-input-decorator-private';
import { SimpleTextarea, SimpleTextareaProps } from '@sbercloud/uikit-product-textarea-private';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

export type TextareaProps = Omit<InputDecoratorPrivateProps, 'children'> &
  Omit<SimpleTextareaProps, 'error' | 'autosize'>;

export const Textarea = forwardRef<HTMLTextAreaElement, WithSupportProps<TextareaProps>>(
  (
    {
      name,
      className,
      label,
      labelTooltip,
      hint,
      value,
      onChange,
      onBlur,
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
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
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
