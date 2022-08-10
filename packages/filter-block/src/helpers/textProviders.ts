import { createTextProvider, LanguageCodeType } from '@sbercloud/uikit-product-utils';

export enum Texts {
  ShowAll = 'showAll',
  Collapse = 'collapse',
  ClearFilters = 'clearFilters',
}

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.ShowAll]: 'Показать все',
    [Texts.Collapse]: 'Свернуть',
    [Texts.ClearFilters]: 'Сбросить все фильтры',
  },
  [LanguageCodeType.enGB]: {
    [Texts.ShowAll]: 'Show all',
    [Texts.Collapse]: 'Collapse',
    [Texts.ClearFilters]: 'Clear all filters',
  },
};

export const textProvider = createTextProvider<Texts>(Dictionary, 'filter-block');
