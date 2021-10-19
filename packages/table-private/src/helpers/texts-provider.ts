import { LanguageCodeType } from '@sbercloud/uikit-utils';

export type EnabledLanguages = LanguageCodeType.ruRU | LanguageCodeType.enGB;

export enum Texts {
  NoRowsInitially = 'NoRowsInitially',
  NoRowsAfterSearch = 'NoRowsAfterSearch',
}

const Dictionary: Record<EnabledLanguages, Record<Texts, string>> = {
  [LanguageCodeType.ruRU]: {
    NoRowsInitially: 'Нет данных',
    NoRowsAfterSearch: 'Ничего не найдено :(',
  },
  [LanguageCodeType.enGB]: {
    NoRowsInitially: 'No data',
    NoRowsAfterSearch: 'Nothing found :(',
  },
};

export function textProvider(languageCode: LanguageCodeType, entity: Texts): string {
  return Dictionary[languageCode][entity];
}
