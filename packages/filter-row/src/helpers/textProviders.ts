import { createTextProvider, LanguageCodeType } from '@sbercloud/uikit-product-utils';

export enum Texts {
  All = 'All',
  ClearFilters = 'ClearFilters',
  SelectAll = 'SelectAll',
}

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.All]: 'Все',
    [Texts.ClearFilters]: 'Сбросить все фильтры',
    [Texts.SelectAll]: 'Выбрать все',
  },
  [LanguageCodeType.enGB]: {
    [Texts.All]: 'All',
    [Texts.ClearFilters]: 'Clear all filters',
    [Texts.SelectAll]: 'Select all',
  },
};

export const textProvider = createTextProvider<Texts>(Dictionary, 'filter-row');
