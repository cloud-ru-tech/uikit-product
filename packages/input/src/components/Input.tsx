import { forwardRef } from 'react';

import { InputDecoratorPrivate, InputDecoratorPrivateProps } from '@sbercloud/uikit-react-input-decorator-private';
import { SimpleInput, SimpleInputProps } from '@sbercloud/uikit-react-input-private';
import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-utils';

export type InputProps = Omit<InputDecoratorPrivateProps, 'children'> & Omit<SimpleInputProps, 'error'>;

const ForwardedInput = forwardRef<HTMLInputElement, WithSupportProps<InputProps>>(
  (
    {
      className,
      label,
      labelTooltip,
      optional,
      hint,
      error,
      value,
      onChange,
      placeholder,
      size,
      type,
      maxLength,
      disabled,
      moreButton,
      autoComplete,
      autoFocus,

      ...rest
    },
    ref,
  ) => {
    const length = maxLength ? { current: value.length, max: maxLength } : undefined;
    return (
      <InputDecoratorPrivate
        className={className}
        label={label}
        labelTooltip={labelTooltip}
        optional={optional}
        hint={hint}
        length={length}
        error={error}
        {...extractSupportProps(rest)}
      >
        <SimpleInput
          value={value}
          onChange={onChange}
          ref={ref}
          error={Boolean(error)}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          placeholder={placeholder}
          size={size}
          type={type}
          maxLength={maxLength}
          disabled={disabled}
          moreButton={moreButton}
        />
      </InputDecoratorPrivate>
    );
  },
);

export const Input = ForwardedInput as typeof ForwardedInput & {
  sizes: typeof SimpleInput.sizes;
  types: typeof SimpleInput.types;
};

Input.sizes = SimpleInput.sizes;
Input.types = SimpleInput.types;
