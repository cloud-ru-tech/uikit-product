import { LanguageCodeType, createTextProvider } from '@sbercloud/uikit-utils';

export enum Texts {
  Clear = 'Clear',
}

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.Clear]: 'Очистить',
  },
  [LanguageCodeType.enGB]: {
    [Texts.Clear]: 'Clear',
  },
};

export const textProvider = createTextProvider<Texts>(Dictionary, 'textarea-private');
