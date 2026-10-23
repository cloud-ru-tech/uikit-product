import { Input } from '../../components';
import { FieldProps } from './FieldProps';
import { createFieldFillBlurHandler } from './utils/createFieldFillBlurHandler';

export function Telegram(props: FieldProps) {
  const { className, name = 'telegramLogin', label = 'Телеграм', required = false, disabled, onFieldFill } = props;

  const handleBlur = createFieldFillBlurHandler(onFieldFill, name);

  return (
    <Input
      className={className}
      name={name}
      label={label}
      inputType='text'
      required={required}
      disabled={disabled}
      validationType={Input.validations.Telegram}
      onBlur={handleBlur}
    />
  );
}
