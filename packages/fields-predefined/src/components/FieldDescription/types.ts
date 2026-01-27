import { ControllerProps, FieldValues } from 'react-hook-form';
import { StringSchema, ValidationError } from 'yup';

import { FieldTextAreaProps } from '@cloud-ru/uikit-product-mobile-fields';

export type FieldDescriptionPropsBase = Omit<
  FieldTextAreaProps,
  'placeholder' | 'label' | 'footer' | 'searchPlaceholder' | 'hint' | 'inputMode' | 'caption' | 'name'
> & {
  customSchema?: StringSchema;
  /** Поле появляется по кнопке "Добавить описание" (только для опционального поля) */
  addButton?: boolean;
};

export type FieldDescriptionProps = FieldDescriptionPropsBase & {
  /** Колбэк, вызываемый при изменении ошибки валидации (только в standalone режиме) */
  onValidationError?: (error: ValidationError | null) => void;
};

export type FieldDescriptionRHFProps = FieldDescriptionPropsBase & {
  /** Режим контроллера с использованием react-hook-form */
  controllerProps: Omit<ControllerProps<FieldValues>, 'render' | 'rules' | 'disabled'>;
};
