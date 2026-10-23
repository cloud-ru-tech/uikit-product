import { Input } from '../../components';
import { FieldProps } from './FieldProps';
import { createFieldFillBlurHandler } from './utils/createFieldFillBlurHandler';

export function Address(props: FieldProps) {
  const {
    className,
    name = 'address',
    label = 'Где вы живете (регион, город, населенный пункт)',
    required = false,
    disabled,
    onFieldFill,
  } = props;

  const handleBlur = createFieldFillBlurHandler(onFieldFill, name);

  return (
    <Input
      className={className}
      name={name}
      label={label}
      inputType='text'
      validationType={Input.validations.Address}
      required={required}
      disabled={disabled}
      onBlur={handleBlur}
    />
  );
}
