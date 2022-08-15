import { createTextProvider, LanguageCodeType } from '@sbercloud/uikit-product-utils';

export enum Texts {
  Search = 'Search',
  Clear = 'Clear',
}

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.Search]: 'Поиск',
    [Texts.Clear]: 'Очистить',
  },
  [LanguageCodeType.enGB]: {
    [Texts.Search]: 'Search',
    [Texts.Clear]: 'Clear',
  },
};

export const textProvider = createTextProvider<Texts>(Dictionary, 'search');
