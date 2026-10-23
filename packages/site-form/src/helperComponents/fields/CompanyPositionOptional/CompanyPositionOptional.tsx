import { useFormContext } from 'react-hook-form';

import { Checkbox, Input } from '../../../components';
import { FieldProps } from '../FieldProps';
import { SparkField } from '../SparkField';
import { createFieldFillBlurHandler } from '../utils/createFieldFillBlurHandler';
import s from './styles.module.scss';

export function CompanyPositionOptional(props: FieldProps) {
  const { className, disabled, onFieldFill } = props;

  const { watch } = useFormContext();

  const isPhysic = Boolean(watch('isNaturalPerson', false));

  const handleBlur = createFieldFillBlurHandler(onFieldFill, 'position');

  return (
    <div className={className}>
      <Checkbox
        className={s.checkbox}
        label='Я физлицо'
        required={false}
        disabled={disabled}
        name='isNaturalPerson'
        value='true'
      />
      <div className={s.double}>
        <SparkField
          className={s.field}
          type='company'
          additionalType='inn'
          label='Название компании'
          required
          disabled={isPhysic || disabled}
          onFieldFill={onFieldFill}
        />
        <Input
          className={s.field}
          name='position'
          label='Должность'
          validationType={Input.validations.Position}
          inputType='text'
          required
          disabled={isPhysic || disabled}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
}
