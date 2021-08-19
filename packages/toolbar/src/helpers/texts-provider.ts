import { LanguageCodeType } from '@sbercloud/uikit-utils';

export enum Texts {
  filter = 'filter',
}

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    filter: 'Фильтр',
  },
  [LanguageCodeType.enGB]: {
    filter: 'Filter',
  },
};

export function textProvider(language: LanguageCodeType, entity: Texts): string {
  return Dictionary?.[language]?.[entity] || '';
}
