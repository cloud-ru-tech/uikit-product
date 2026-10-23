import { Input } from '../../components';
import { ValidationType } from '../../components/controls/Input/constants';
import { FieldProps } from './FieldProps';
import { createFieldFillBlurHandler } from './utils/createFieldFillBlurHandler';

type NameVariant = 'name' | 'lastName' | 'middleName';

const NAME_DEFAULTS: Record<NameVariant, { name: string; label: string; validationType: ValidationType }> = {
  name: { name: 'name', label: 'Имя', validationType: ValidationType.Name },
  lastName: { name: 'surname', label: 'Фамилия', validationType: ValidationType.Surname },
  middleName: { name: 'secondName', label: 'Отчество', validationType: ValidationType.SecondName },
};

type NameProps = FieldProps & {
  variant?: NameVariant;
};

export function Name({ variant = 'name', ...props }: NameProps) {
  const defaults = NAME_DEFAULTS[variant];
  const { className, name = defaults.name, label = defaults.label, required = false, disabled, onFieldFill } = props;

  const handleBlur = createFieldFillBlurHandler(onFieldFill, name);

  return (
    <Input
      className={className}
      name={name}
      label={label}
      inputType='text'
      validationType={defaults.validationType}
      required={required}
      disabled={disabled}
      onBlur={handleBlur}
    />
  );
}
