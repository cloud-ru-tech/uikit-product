import { IMask } from 'react-imask';

import { InputMaskOptions } from '../../hooks';

export enum Masks {
  Phone = 'Phone',
  Passport = 'Passport',
  Snils = 'Snils',
  ConfirmationCode = 'ConfirmationCode',
  IpV4Address = 'IpV4Address',
  IpV4AddressWithMask = 'IpV4AddressWithMask',
  Date = 'Date',
}

export const MASKS_CONFIG: Record<Masks, InputMaskOptions> = {
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
  [Masks.ConfirmationCode]: {
    mask: '0000',
    placeholderChar: '_',
  },
  [Masks.IpV4Address]: {
    mask: '0[00]{.}`0[00]{.}`0[00]{.}`0[00]',
    placeholderChar: '_',
  },
  [Masks.IpV4AddressWithMask]: {
    mask: '0[00]{.}`0[00]{.}`0[00]{.}`0[00]{/}`0[0]',
    placeholderChar: '_',
  },
  [Masks.Date]: {
    mask: IMask.MaskedDate,
    lazy: false,
    blocks: {
      d: { mask: IMask.MaskedRange, placeholderChar: 'Д', from: 1, to: 31, maxLength: 2 },
      m: { mask: IMask.MaskedRange, placeholderChar: 'M', from: 1, to: 12, maxLength: 2 },
      Y: { mask: IMask.MaskedRange, placeholderChar: 'Г', from: 1900, to: 2100, maxLength: 4 },
    },
  },
};
