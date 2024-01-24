import { createTextProvider, LanguageCodeType } from '@sbercloud/uikit-product-utils';

export type EnabledLanguages = LanguageCodeType.ruRU | LanguageCodeType.enGB;

export enum Texts {
  NoResultsStateTitle = 'NoResultsStateTitle',
  NoResultsStateDescription = 'NoResultsStateDescription',
  NoDataStateTitle = 'NoDataStateTitle',
  NoDataStateDescription = 'NoDataStateDescription',
  SearchPlaceholder = 'SearchPlaceholder',
  PaginationOptionsLabel = 'PaginationOptionsLabel',
}

const Dictionary: Record<EnabledLanguages, Record<Texts, string>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.NoResultsStateTitle]: 'Ничего не найдено',
    [Texts.NoResultsStateDescription]: 'Попробуйте изменить запрос',
    [Texts.NoDataStateTitle]: 'Нет данных',
    [Texts.NoDataStateDescription]: 'Попробуйте обновить страницу',
    [Texts.SearchPlaceholder]: 'Поиск',
    [Texts.PaginationOptionsLabel]: 'Кол-во строк: ',
  },
  [LanguageCodeType.enGB]: {
    [Texts.NoResultsStateTitle]: 'Not found',
    [Texts.NoResultsStateDescription]: 'Try entering another query',
    [Texts.NoDataStateTitle]: 'No data',
    [Texts.NoDataStateDescription]: 'Try refreshing the page',
    [Texts.SearchPlaceholder]: 'Search',
    [Texts.PaginationOptionsLabel]: 'Rows volume: ',
  },
};

export const textProvider = createTextProvider<Texts>(Dictionary, 'table-snack');
