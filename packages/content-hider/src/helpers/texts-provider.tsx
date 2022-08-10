import { createTextProvider, LanguageCodeType } from '@sbercloud/uikit-product-utils';

export enum Texts {
  Hide = 'hide',
  Show = 'show',
}

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.Hide]: 'Свернуть',
    [Texts.Show]: 'Читать полностью',
  },
  [LanguageCodeType.enGB]: {
    [Texts.Hide]: 'Collapse',
    [Texts.Show]: 'Read more',
  },
};

export const textProvider = createTextProvider<Texts>(Dictionary, 'content-hider');
