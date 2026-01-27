import { ControllerProps, FieldValues } from 'react-hook-form';
import { StringSchema, ValidationError } from 'yup';

import { FieldTextProps } from '@cloud-ru/uikit-product-mobile-fields';

export type BaseFieldNameProps = Omit<
  FieldTextProps,
  'placeholder' | 'label' | 'footer' | 'type' | 'inputMode' | 'caption' | 'hint'
> & {
  showLabel?: boolean;
  customSchema?: StringSchema;
};

export type FieldNameProps = BaseFieldNameProps & {
  /** Колбэк, вызываемый при изменении ошибки валидации */
  onValidationError?: (error: ValidationError | null) => void;
};

export type FieldNameRHFProps = BaseFieldNameProps & {
  /** Режим контроллера с использованием react-hook-form */
  controllerProps: Omit<ControllerProps<FieldValues>, 'render' | 'rules' | 'disabled'>;
};
