import { Input } from '../../components';
import { FieldProps } from './FieldProps';
import { createFieldFillBlurHandler } from './utils/createFieldFillBlurHandler';

export function Passport(props: FieldProps) {
  const { className, name = 'passport', label = 'Паспорт', required = false, disabled, onFieldFill } = props;

  const handleBlur = createFieldFillBlurHandler(onFieldFill, name);

  return (
    <Input
      className={className}
      name={name}
      label={label}
      inputType='passport'
      validationType={Input.validations.Passport}
      required={required}
      disabled={disabled}
      onBlur={handleBlur}
    />
  );
}
