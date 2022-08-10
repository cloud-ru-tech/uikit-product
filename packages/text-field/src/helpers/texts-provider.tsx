import { createTextProvider, LanguageCodeType } from '@sbercloud/uikit-product-utils';

export enum Texts {
  Hide = 'hide',
  Show = 'show',
}

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.Hide]: 'Скрыть',
    [Texts.Show]: 'Показать',
  },
  [LanguageCodeType.enGB]: {
    [Texts.Hide]: 'Hide',
    [Texts.Show]: 'Show',
  },
};

export const textProvider = createTextProvider<Texts>(Dictionary, 'text-field');
