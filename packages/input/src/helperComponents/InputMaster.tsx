import { ChangeEvent, ReactNode } from 'react';

import { InputDecoratorPrivate, InputDecoratorPrivateProps } from '@sbercloud/uikit-product-input-decorator-private';
import { SimpleInput, SimpleInputProps } from '@sbercloud/uikit-product-input-private';
import { WithSupportProps, extractSupportProps, useUniqueId } from '@sbercloud/uikit-product-utils';

export type InputMasterProps = WithSupportProps<{
  onChange: (value: string, event?: ChangeEvent<HTMLInputElement>) => void;
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
  autoFocus?: boolean;
  autoComplete?: boolean;
  name?: string;
  size?: SimpleInputProps['size'];
}>;

export function InputMaster({
  onChange,
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
  autoFocus,
  autoComplete,
  name,
  size,
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
        error: Boolean(error),
        autoComplete,
        autoFocus,
        name,
        size,
        maxLength,
        disabled,
      })}
    </InputDecoratorPrivate>
  );
}

InputMaster.sizes = SimpleInput.sizes;
