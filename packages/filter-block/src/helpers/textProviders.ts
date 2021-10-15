import { LanguageCodeType } from '@sbercloud/uikit-utils';

export enum Texts {
  ShowAll = 'showAll',
  Collapse = 'collapse',
  ClearFilters = 'clearFilters',
}

enum TextsRU {
  ShowAll = 'Показать все',
  Collapse = 'Свернуть',
  ClearFilters = 'Сбросить все фильтры',
}

enum TextsEN {
  ShowAll = 'Show all',
  Collapse = 'Collapse',
  ClearFilters = 'Clear all filters',
}

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    showAll: TextsRU.ShowAll,
    collapse: TextsRU.Collapse,
    clearFilters: TextsRU.ClearFilters,
  },
  [LanguageCodeType.enGB]: {
    showAll: TextsEN.ShowAll,
    collapse: TextsEN.Collapse,
    clearFilters: TextsEN.ClearFilters,
  },
};

export function textProvider(language: LanguageCodeType, entity: Texts): string {
  return Dictionary?.[language]?.[entity] || '';
}
