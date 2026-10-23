import { FieldProps } from './FieldProps';
import { useIsNaturalPerson } from './NaturalPerson';
import { SparkField } from './SparkField';

export function Company(props: FieldProps) {
  const { className, label = 'Название компании', required = false, disabled, onFieldFill } = props;

  const isNaturalPerson = useIsNaturalPerson();

  return (
    <SparkField
      className={className}
      type='company'
      additionalType='inn'
      label={label}
      required={required}
      disabled={isNaturalPerson || disabled}
      onFieldFill={onFieldFill}
    />
  );
}
