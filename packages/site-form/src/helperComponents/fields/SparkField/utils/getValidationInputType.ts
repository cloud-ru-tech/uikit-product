import { Input } from '../../../../components';
import { FieldTypeInnCompany } from './types';

export const getValidationInputType = (type: FieldTypeInnCompany) =>
  type === 'inn'
    ? {
        inputType: 'number' as const,
        validationType: Input.validations.Inn,
      }
    : {
        inputType: 'text' as const,
        validationType: Input.validations.Company,
      };
