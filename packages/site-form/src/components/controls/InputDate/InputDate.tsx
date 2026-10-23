import { FocusEvent } from 'react';
import { useController } from 'react-hook-form';

import { FieldDate, FieldDateProps } from '@snack-uikit/fields';

import { ValidationType } from '../Input/constants';
import { getSchema } from '../Input/getSchema';
import { fromUtcIsoDate, toUtcIsoDate } from './utils';

type InputDateProps = Pick<FieldDateProps, 'className' | 'label' | 'required' | 'disabled'> & {
  name: string;
  validationType: ValidationType;
  onBlur?(event: FocusEvent<HTMLInputElement>): void;
};

export function InputDate({ name, label, required, disabled, className, validationType, onBlur }: InputDateProps) {
  const { field, fieldState } = useController({
    name,
    rules: getSchema(validationType, required, disabled),
  });

  const handleChange: NonNullable<FieldDateProps['onChange']> = date => {
    field.onChange(date ? toUtcIsoDate(date) : undefined);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    field.onBlur();
    onBlur?.(event);
  };

  return (
    <div className={className}>
      <FieldDate
        ref={field.ref}
        id={name}
        name={name}
        mode='date'
        size='l'
        label={label}
        required={required}
        disabled={disabled}
        value={field.value ? fromUtcIsoDate(field.value) : undefined}
        onChange={handleChange}
        onBlur={handleBlur}
        error={fieldState.error?.message}
        validationState={fieldState.isDirty && !fieldState.error ? 'success' : undefined}
        className='ym-disable-keys'
        data-click='funnel-form-input'
        data-test-id='date-input'
      />
    </div>
  );
}
