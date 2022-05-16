import { LanguageCodeType, createTextProvider } from '@sbercloud/uikit-product-utils';

export enum Texts {
  Clear = 'Clear',
  Show = 'Show',
}

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.Clear]: 'Очистить',
    [Texts.Show]: 'Показать',
  },
  [LanguageCodeType.enGB]: {
    [Texts.Clear]: 'Clear',
    [Texts.Show]: 'Show',
  },
};

export const textProvider = createTextProvider<Texts>(Dictionary, 'input-private');
