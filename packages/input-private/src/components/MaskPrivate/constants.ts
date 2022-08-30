import { IMask } from 'react-imask';

import { InputMaskOptions } from '../../hooks';

export enum Masks {
  Phone = 'Phone',
  Passport = 'Passport',
  Snils = 'Snils',
  ConfirmationCode = 'ConfirmationCode',
  IpV4Address = 'IpV4Address',
  IpV4AddressWithMask = 'IpV4AddressWithMask',
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
    mask: '0[00]{.}0[00]{.}0[00]{.}0[00]',
    placeholderChar: '_',
  },
  [Masks.IpV4AddressWithMask]: {
    mask: '0[00]{.}0[00]{.}0[00]{.}0[00][{/}[MM]]',
    placeholderChar: '_',
    blocks: {
      MM: {
        mask: IMask.MaskedRange,
        from: 0,
        to: 32,
      },
    },
  },
};
