import { IMask } from 'react-imask';

export enum Masks {
  Phone = 'Phone',
  Passport = 'Passport',
  Snils = 'Snils',
}

export const MASKS_CONFIG: { [key in Masks]: IMask.AnyMaskedOptions } = {
  [Masks.Phone]: {
    mask: '+{7} 000 000-00-00',
    placeholderChar: '_',
  },
  [Masks.Passport]: {
    mask: '0000 000000',
    placeholderChar: '_',
  },
  [Masks.Snils]: {
    mask: '000000-000 00',
    placeholderChar: '_',
  },
};
