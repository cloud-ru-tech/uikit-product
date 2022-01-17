import { LanguageCodeType } from '@sbercloud/uikit-utils';

export enum Texts {
  hide = 'hide',
  show = 'show',
}

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    hide: 'Скрыть',
    show: 'Показать',
  },
  [LanguageCodeType.enGB]: {
    hide: 'Hide',
    show: 'Show',
  },
};

export function textProvider(language: LanguageCodeType, entity: Texts): string {
  return Dictionary?.[language]?.[entity] || '';
}
