import { LanguageCodeType } from '@sbercloud/uikit-utils';

export type EnabledLanguages = LanguageCodeType.ruRU | LanguageCodeType.enGB;

export enum Texts {
  SearchPlaceholder = 'SearchPlaceholder',
  Delete = 'Delete',
}

const Dictionary: Record<EnabledLanguages, Record<Texts, string>> = {
  [LanguageCodeType.ruRU]: {
    SearchPlaceholder: 'Поиск',
    Delete: 'Удалить',
  },
  [LanguageCodeType.enGB]: {
    SearchPlaceholder: 'Search',
    Delete: 'Delete',
  },
};

export function textProvider(languageCode: LanguageCodeType, entity: Texts): string {
  return Dictionary[languageCode][entity];
}
