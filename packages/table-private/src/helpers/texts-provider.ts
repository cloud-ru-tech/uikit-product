import { LanguageCodeType, useLanguage } from '@sbercloud/uikit-utils';

export type EnabledLanguages = LanguageCodeType.ruRU | LanguageCodeType.enGB;

export enum Texts {
  noRowsInitially = 'noRowsInitially',
  noRowsAfterSearch = 'noRowsAfterSearch',
}

const Dictionary: Record<EnabledLanguages, Record<Texts, string>> = {
  [LanguageCodeType.ruRU]: {
    noRowsInitially: 'Нет данных',
    noRowsAfterSearch: 'Ничего не найдено :(',
  },
  [LanguageCodeType.enGB]: {
    noRowsInitially: 'No data',
    noRowsAfterSearch: 'Nothing found :(',
  },
};

export function TextProvider(entity: Texts): string {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  return Dictionary[languageCode][entity];
}
