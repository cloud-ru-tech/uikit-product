import { useWatch } from 'react-hook-form';

import { Checkbox } from '../../components';
import { FieldProps } from './FieldProps';

const FIELD_NAME = 'isNaturalPerson';

export function useIsNaturalPerson() {
  return Boolean(useWatch({ name: FIELD_NAME, defaultValue: false }));
}

export function NaturalPerson(props: FieldProps) {
  const { className, label = 'Я физлицо', disabled } = props;

  return (
    <Checkbox className={className} name={FIELD_NAME} value='true' label={label} required={false} disabled={disabled} />
  );
}
