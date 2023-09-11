import { ChangeEvent, FocusEvent, ReactNode } from 'react';

import { InputDecoratorPrivate, InputDecoratorPrivateProps } from '@sbercloud/uikit-product-input-decorator-private';
import { SimpleInput, SimpleInputProps } from '@sbercloud/uikit-product-input-private';
import { extractSupportProps, useUniqueId, WithSupportProps } from '@sbercloud/uikit-product-utils';

export type InputMasterProps = WithSupportProps<{
  onChange: (value: string, event?: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event?: FocusEvent<HTMLInputElement>) => void;
  children: (props: SimpleInputProps) => ReactNode;
  value?: string;
  label?: string;
  labelTooltip?: InputDecoratorPrivateProps['labelTooltip'];
  optional?: boolean;
  disabled?: boolean;
  hint?: string;
  error?: string;
  maxLength?: number;
  className?: string;
  autoComplete?: boolean | string;
  name?: string;
  size?: SimpleInputProps['size'];
  hideClearButton?: boolean;
}>;

export function InputMaster({
  onChange,
  onBlur,
  children,
  value = '',
  label,
  labelTooltip,
  optional,
  disabled,
  hint,
  error,
  maxLength,
  className,
  autoComplete,
  name,
  size,
  hideClearButton,
  ...rest
}: InputMasterProps) {
  const id = useUniqueId('InputMaster');

  return (
    <InputDecoratorPrivate
      className={className}
      label={label}
      labelTooltip={labelTooltip}
      labelFor={id}
      optional={optional}
      hint={hint}
      length={maxLength ? { current: value.length, max: maxLength } : undefined}
      error={error}
      {...extractSupportProps(rest)}
    >
      {children({
        id,
        value,
        onChange,
        onBlur,
        error: Boolean(error),
        autoComplete,
        name,
        size,
        maxLength,
        disabled,
        hideClearButton,
      })}
    </InputDecoratorPrivate>
  );
}

InputMaster.sizes = SimpleInput.sizes;
