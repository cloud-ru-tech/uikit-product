import { ReactNode } from 'react';

import { InputDecoratorPrivate } from '@sbercloud/uikit-product-input-decorator-private';
import { TooltipProps } from '@sbercloud/uikit-product-tooltip';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

export type FormFieldProps = WithSupportProps<{
  hint?: Omit<TooltipProps, 'children'>;
  label?: string;
  labelFor?: string;
  error?: string;
  required?: boolean;
  description?: string;
  className?: string;
  length?: {
    max: number;
    current: number;
  };
  children: ReactNode;
}>;

export function FormField({
  label,
  hint,
  description,
  required = true,
  error,
  className,
  labelFor,
  length,
  children,
  ...rest
}: FormFieldProps) {
  return (
    <InputDecoratorPrivate
      className={className}
      label={label}
      labelFor={labelFor}
      error={error}
      optional={Boolean(!required)}
      hint={description}
      labelTooltip={hint}
      length={length}
      {...extractSupportProps(rest)}
    >
      {children}
    </InputDecoratorPrivate>
  );
}
