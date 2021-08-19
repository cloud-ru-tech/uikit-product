import { LanguageCodeType } from '@sbercloud/uikit-utils';

export enum Texts {
  close = 'close',
}

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    close: 'Закрыть',
  },
  [LanguageCodeType.enGB]: {
    close: 'Close',
  },
};

export function textProvider(language: LanguageCodeType, entity: Texts): string {
  return Dictionary?.[language]?.[entity] || '';
}
