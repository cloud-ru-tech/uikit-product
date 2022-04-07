import { LanguageCodeType, createTextProvider } from '@sbercloud/uikit-utils';

export enum Texts {
  Filter = 'Filter',
  Clear = 'Clear',
  Refresh = 'Refresh',
}

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.Filter]: 'Фильтр',
    [Texts.Clear]: 'Очистить',
    [Texts.Refresh]: 'Обновить',
  },
  [LanguageCodeType.enGB]: {
    [Texts.Filter]: 'Filter',
    [Texts.Clear]: 'Clear',
    [Texts.Refresh]: 'Refresh',
  },
};

export const textProvider = createTextProvider<Texts>(Dictionary, 'toolbar');
