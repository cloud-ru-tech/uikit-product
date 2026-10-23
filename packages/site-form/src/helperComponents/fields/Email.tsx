import { Input } from '../../components';
import { FieldProps } from './FieldProps';
import { createFieldFillBlurHandler } from './utils/createFieldFillBlurHandler';

export function Email(props: FieldProps) {
  const { className, name = 'email', label = 'Электронная почта', required = false, disabled, onFieldFill } = props;

  const handleBlur = createFieldFillBlurHandler(onFieldFill, name);

  return (
    <Input
      className={className}
      name={name}
      label={label}
      inputType='text'
      validationType={Input.validations.Email}
      required={required}
      disabled={disabled}
      onBlur={handleBlur}
    />
  );
}
