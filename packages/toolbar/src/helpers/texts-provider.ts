import { LanguageCodeType } from '@sbercloud/uikit-utils';

export enum Texts {
  Filter = 'Filter',
  Clear = 'Clear',
}

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.Filter]: 'Фильтр',
    [Texts.Clear]: 'Очистить',
  },
  [LanguageCodeType.enGB]: {
    [Texts.Filter]: 'Filter',
    [Texts.Clear]: 'Clear',
  },
};

export function textProvider(languageCode: LanguageCodeType, entity: Texts): string {
  return Dictionary?.[languageCode]?.[entity] || '';
}
