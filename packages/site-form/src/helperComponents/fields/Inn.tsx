import { FieldProps } from './FieldProps';
import { useIsNaturalPerson } from './NaturalPerson';
import { SparkField } from './SparkField';

export function Inn(props: FieldProps) {
  const { className, label = 'ИНН', required = false, disabled, onFieldFill } = props;

  const isNaturalPerson = useIsNaturalPerson();

  return (
    <SparkField
      className={className}
      type='inn'
      additionalType='company'
      label={label}
      required={required}
      disabled={isNaturalPerson || disabled}
      onFieldFill={onFieldFill}
    />
  );
}
