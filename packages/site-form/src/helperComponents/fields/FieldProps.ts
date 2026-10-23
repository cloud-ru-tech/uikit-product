import { FormField } from '../../types';

export type FieldProps = Pick<FormField, 'name' | 'label' | 'required'> & {
  className?: string;
  disabled?: boolean;
  onFieldFill(name: string): void;
};
