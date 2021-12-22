import { LanguageCodeType } from '@sbercloud/uikit-utils';

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

export function textProvider(language: LanguageCodeType, entity: Texts): string {
  return Dictionary?.[language]?.[entity] || '';
}
