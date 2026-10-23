import { useFormContext } from 'react-hook-form';

import { InputDate, ValidationType } from '../../components';
import { FieldProps } from './FieldProps';

export function BirthDate(props: FieldProps) {
  const { className, name = 'birthDate', label = 'Дата рождения', required = false, disabled, onFieldFill } = props;
  const { getValues, trigger } = useFormContext();

  const handleBlur = async () => {
    const value = getValues(name);

    if (!value || disabled) {
      return;
    }

    const isValid = await trigger(name);

    if (isValid && getValues(name) === value) {
      onFieldFill(name);
    }
  };

  return (
    <InputDate
      className={className}
      name={name}
      label={label}
      validationType={ValidationType.BirthDate}
      required={required}
      disabled={disabled}
      onBlur={handleBlur}
    />
  );
}
