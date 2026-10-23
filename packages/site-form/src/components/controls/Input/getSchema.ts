import { valSchema } from '../../../validation/valSchema';
import { PHONE_VALIDATION_TYPE, ValidationType } from './constants';

export const getSchema = (
  validationType: ValidationType | typeof PHONE_VALIDATION_TYPE,
  required?: boolean,
  disabled?: boolean,
  maxLength?: number,
) => {
  const schema = valSchema[validationType];
  return {
    ...schema,
    ...(maxLength !== undefined && {
      maxLength: { value: maxLength, message: 'Превышено допустимое число символов' },
    }),
    required: !disabled && required ? schema?.required : false,
  };
};
