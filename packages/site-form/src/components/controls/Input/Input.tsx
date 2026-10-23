import cn from 'classnames';
import { FocusEvent } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { FieldText } from '@snack-uikit/fields';

import { InputPassport } from '../InputPassport';
import { InputPhone } from '../InputPhone';
import { PHONE_VALIDATION_TYPE, ValidationType } from './constants';
import { getSchema } from './getSchema';
import { InputProps } from './types';

export function Input({
  label,
  required,
  validationType,
  maxLength,
  name,
  disabled,
  inputType,
  placeholder,
  className = '',
  onBlur,
  onChange,
  ...rest
}: InputProps) {
  const { getFieldState, clearErrors } = useFormContext();
  const { field, fieldState } = useController({
    name,
    rules: getSchema(
      inputType === 'phone' ? PHONE_VALIDATION_TYPE : (validationType as ValidationType),
      required,
      disabled,
      maxLength,
    ),
  });

  const handleChange = (value: string) => {
    const nextValue = inputType === 'number' ? value.replace(/(?!\d).*/g, '') : value;

    if (getFieldState(name).error) {
      clearErrors(name);
    }

    field.onChange(nextValue);
    onChange?.(nextValue);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    field.onBlur();

    if (!fieldState.error?.message) {
      onBlur?.(event);
    }
  };

  if (inputType === 'phone') {
    return (
      <InputPhone
        id={name}
        size='l'
        className={cn(className, 'ym-disable-keys')}
        label={label}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        {...field}
        {...rest}
        onBlur={handleBlur}
        onChange={handleChange}
        error={fieldState.error?.message}
        validationState={fieldState.isDirty && !fieldState.error ? 'success' : undefined}
        data-test-id='phone-input'
        data-click='funnel-form-input'
      />
    );
  }

  const fieldProps = {
    id: name,
    required,
    disabled,
    label,
    placeholder,
    size: 'l' as const,
    className: cn({ 'ym-disable-keys': name !== 'name' }),
    ...field,
    ...rest,
    onBlur: handleBlur,
    onChange: handleChange,
    error: fieldState.error?.message,
    validationState: fieldState.isDirty && !fieldState.error ? ('success' as const) : undefined,
    'data-click': 'funnel-form-input',
  };

  return (
    <div className={className}>
      {inputType === 'passport' ? (
        <InputPassport {...fieldProps} data-test-id='passport-input' />
      ) : (
        <FieldText {...fieldProps} inputMode='text' data-test-id={inputType === 'number' ? 'number-input' : 'input'} />
      )}
    </div>
  );
}

Input.validations = ValidationType;
