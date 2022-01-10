import { LanguageCodeType } from '@sbercloud/uikit-utils';

export enum Texts {
  Clear = 'Clear',
  Show = 'Show',
}

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.Clear]: 'Очистить',
    [Texts.Show]: 'Показать',
  },
  [LanguageCodeType.enGB]: {
    [Texts.Clear]: 'Clear',
    [Texts.Show]: 'Show',
  },
};

export function textProvider(languageCode: LanguageCodeType, entity: Texts): string {
  return Dictionary?.[languageCode]?.[entity] || '';
}
