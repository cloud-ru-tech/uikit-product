import { Input } from '../../components';
import { FieldProps } from './FieldProps';
import { createFieldFillBlurHandler } from './utils/createFieldFillBlurHandler';

export function Phone(props: FieldProps) {
  const { className, name, label = 'Телефон', required = false, disabled, onFieldFill } = props;

  const handleBlur = createFieldFillBlurHandler(onFieldFill, name ?? 'tel');

  return (
    <Input
      className={className}
      name={name ?? 'phone'}
      label={label}
      inputType='phone'
      required={required}
      disabled={disabled}
      onBlur={handleBlur}
    />
  );
}
