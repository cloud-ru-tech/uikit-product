import { Input } from '../../components';
import { FieldProps } from './FieldProps';
import { useIsNaturalPerson } from './NaturalPerson';
import { createFieldFillBlurHandler } from './utils/createFieldFillBlurHandler';

export function Position(props: FieldProps) {
  const { className, name = 'position', label = 'Должность', required = false, disabled, onFieldFill } = props;

  const isNaturalPerson = useIsNaturalPerson();

  const handleBlur = createFieldFillBlurHandler(onFieldFill, name);

  return (
    <Input
      className={className}
      name={name}
      label={label}
      validationType={Input.validations.Position}
      inputType='text'
      required={required}
      disabled={isNaturalPerson || disabled}
      onBlur={handleBlur}
    />
  );
}
