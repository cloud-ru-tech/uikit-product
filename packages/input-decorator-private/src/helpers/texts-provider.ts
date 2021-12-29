import { LanguageCodeType } from '@sbercloud/uikit-utils';

export enum Texts {
  Optional = 'Optional',
}

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.Optional]: 'Опционально',
  },
  [LanguageCodeType.enGB]: {
    [Texts.Optional]: 'Optional',
  },
};

export function textProvider(languageCode: LanguageCodeType, entity: Texts): string {
  return Dictionary?.[languageCode]?.[entity] || '';
}
