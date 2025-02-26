import { createTextProvider, LanguageCodeType } from '@sbercloud/uikit-product-utils';

export enum Texts {
  BackTo = 'backTo',
  Documentation = 'documentation',
  SearchByServices = 'search-by-services',
  CloseSearch = 'close-search',
  OpenSearch = 'open-search',
}

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.BackTo]: 'Назад к',
    [Texts.Documentation]: 'Документация',
    [Texts.SearchByServices]: 'Поиск по сервисам',
    [Texts.CloseSearch]: 'Закрыть поиск',
    [Texts.OpenSearch]: 'Открыть поиск',
  },
  [LanguageCodeType.enGB]: {
    [Texts.BackTo]: 'Back to',
    [Texts.Documentation]: 'Documentation',
    [Texts.SearchByServices]: 'Search by service',
    [Texts.CloseSearch]: 'Close search',
    [Texts.OpenSearch]: 'Open search',
  },
};

export const textProvider = createTextProvider<Texts>(Dictionary, 'no-access');
