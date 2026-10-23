import cn from 'classnames';
import { FocusEvent } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { FieldTextArea, FieldTextAreaProps } from '@snack-uikit/fields';

import { MAX_TEXTAREA_CHARACTERS } from './constants';
import s from './styles.module.scss';

type TextAreaProps = Pick<
  FieldTextAreaProps,
  'label' | 'className' | 'required' | 'onBlur' | 'onChange' | 'disabled' | 'maxLength' | 'maxRows'
> & {
  name: string;
};

const getSchema = (required?: boolean, disabled?: boolean) => ({
  required:
    !disabled && required
      ? {
          value: true,
          message: 'Введите комментарий',
        }
      : false,
});

export function TextArea({
  label,
  name,
  required,
  disabled,
  className,
  onBlur,
  maxLength,
  onChange,
  maxRows,
  ...rest
}: TextAreaProps) {
  const limitCharacters = maxLength ?? MAX_TEXTAREA_CHARACTERS;

  const { getFieldState, clearErrors } = useFormContext();
  const { field, fieldState } = useController({
    name,
    rules: getSchema(required, disabled),
  });

  const handleChange = (value: string) => {
    if (getFieldState(name).error) {
      clearErrors(name);
    }

    field.onChange(value);
    onChange?.(value);
  };

  const handleBlur = (event: FocusEvent<HTMLTextAreaElement>) => {
    field.onBlur();

    if (!fieldState.error?.message) {
      onBlur?.(event);
    }
  };

  return (
    <div className={cn(s.root, className)}>
      <FieldTextArea
        id={name}
        disabled={disabled}
        maxLength={limitCharacters}
        required={required}
        label={label}
        maxRows={maxRows}
        minRows={1}
        allowMoreThanMaxLength={false}
        {...rest}
        {...field}
        onChange={handleChange}
        onBlur={handleBlur}
        error={fieldState.error?.message}
        validationState={fieldState.isDirty && !fieldState.error ? 'success' : undefined}
        size='l'
        data-test-id='textarea'
        data-click='funnel-form-input'
      />
    </div>
  );
}
