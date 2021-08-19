import { LanguageCodeType } from '@sbercloud/uikit-utils';

export type EnabledLanguages = LanguageCodeType.ruRU | LanguageCodeType.enGB;

export enum Texts {
  noRowsInitially = 'noRowsInitially',
  noRowsAfterSearch = 'noRowsAfterSearch',
  searchPlaceholder = 'searchPlaceholder',
  delete = 'delete',
}

const Dictionary: Record<EnabledLanguages, Record<Texts, string>> = {
  [LanguageCodeType.ruRU]: {
    noRowsInitially: 'Нет данных',
    noRowsAfterSearch: 'Ничего не найдено :(',
    searchPlaceholder: 'Поиск',
    delete: 'Удалить',
  },
  [LanguageCodeType.enGB]: {
    noRowsInitially: 'No data',
    noRowsAfterSearch: 'Nothing found :(',
    searchPlaceholder: 'Search',
    delete: 'Delete',
  },
};

export function textProvider(language: EnabledLanguages, entity: Texts): string {
  return Dictionary[language][entity];
}
