import { createTextProvider, LanguageCodeType } from '@sbercloud/uikit-product-utils';

export enum Texts {
  Optional = 'Optional',
}

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.Optional]: 'Опционально',
  },
  [LanguageCodeType.enGB]: {
    [Texts.Optional]: 'Optional',
  },
};

export const textProvider = createTextProvider<Texts>(Dictionary, 'input-decorator-private');
