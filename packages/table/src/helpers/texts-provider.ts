import { LanguageCodeType } from '@sbercloud/uikit-utils';

export type EnabledLanguages = LanguageCodeType.ruRU | LanguageCodeType.enGB;

export enum Texts {
  SearchPlaceholder = 'SearchPlaceholder',
  Delete = 'Delete',
  Export = 'Export',
  ExportCSV = 'ExportCSV',
  ExportExcel = 'ExportExcel',
}

const Dictionary: Record<EnabledLanguages, Record<Texts, string>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.SearchPlaceholder]: 'Поиск',
    [Texts.Delete]: 'Удалить',
    [Texts.Export]: 'Экспорт',
    [Texts.ExportCSV]: 'Экспорт таблицы в .csv',
    [Texts.ExportExcel]: 'Экспорт таблицы в .xls',
  },
  [LanguageCodeType.enGB]: {
    [Texts.SearchPlaceholder]: 'Search',
    [Texts.Delete]: 'Delete',
    [Texts.Export]: 'Export',
    [Texts.ExportCSV]: 'Exporting a table to .csv',
    [Texts.ExportExcel]: 'Exporting a table to .xls',
  },
};

export function textProvider(languageCode: LanguageCodeType, entity: Texts): string {
  return Dictionary[languageCode][entity];
}
