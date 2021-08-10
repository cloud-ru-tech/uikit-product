import { LanguageCodeType } from '@sbercloud/uikit-utils';

export type EnabledLanguages = LanguageCodeType.ruRU | LanguageCodeType.enGB;

export enum Texts {
  noRowsInitially = 'noRowsInitially',
  noRowsAfterSearch = 'noRowsAfterSearch',
  searchPlaceholder = 'searchPlaceholder',
}

const Dictionary: Record<EnabledLanguages, Record<Texts, string>> = {
  [LanguageCodeType.ruRU]: {
    noRowsInitially: 'Нет данных',
    noRowsAfterSearch: 'Ничего не найдено :(',
    searchPlaceholder: 'Поиск',
  },
  [LanguageCodeType.enGB]: {
    noRowsInitially: 'No data',
    noRowsAfterSearch: 'Nothing found :(',
    searchPlaceholder: 'Search',
  },
};

export function textProvider(language: EnabledLanguages, entity: Texts): string {
  return Dictionary[language][entity];
}
