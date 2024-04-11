import { createTextProvider, LanguageCodeType } from '@sbercloud/uikit-product-utils';

export enum Texts {
  BooleanValueTrue = 'BooleanValueTrue',
  BooleanValueFalse = 'BooleanValueFalse',
}

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.BooleanValueTrue]: 'Да',
    [Texts.BooleanValueFalse]: 'Нет',
  },
  [LanguageCodeType.enGB]: {
    [Texts.BooleanValueTrue]: 'Yes',
    [Texts.BooleanValueFalse]: 'No',
  },
};

export const textProvider = createTextProvider<Texts>(Dictionary, 'info-row');
