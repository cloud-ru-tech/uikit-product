import { FieldTextProps } from '@snack-uikit/fields';

import { ValidationType } from './constants';

type InputBase = Pick<
  FieldTextProps,
  | 'value'
  | 'onChange'
  | 'onBlur'
  | 'className'
  | 'required'
  | 'label'
  | 'disabled'
  | 'placeholder'
  | 'hint'
  | 'showHintIcon'
> & {
  name: string;
  /** Максимальная длина значения при валидации. Введенный текст не обрезается */
  maxLength?: number;
};

type PhoneInput = InputBase & {
  inputType: 'phone';
  validationType?: undefined;
  required?: boolean;
};

type NumberInput = InputBase & {
  inputType: 'number';
  validationType: ValidationType;
  required: boolean;
};

type PassportInput = InputBase & {
  inputType: 'passport';
  validationType: ValidationType;
  required?: boolean;
};

type TextInput = InputBase & {
  inputType: 'text';
  validationType: ValidationType;
  required?: boolean;
};

export type InputProps = PhoneInput | TextInput | NumberInput | PassportInput;
