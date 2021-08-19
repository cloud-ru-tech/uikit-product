import { LanguageCodeType } from '@sbercloud/uikit-utils';

export enum Texts {
  show = 'show',
  hide = 'hide',
  clear = 'clear',
}

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    show: 'Показать',
    hide: 'Скрыть',
    clear: 'Очистить',
  },
  [LanguageCodeType.enGB]: {
    show: 'Show',
    hide: 'Hide',
    clear: 'Clear',
  },
};

export function textProvider(language: LanguageCodeType, entity: Texts): string {
  return Dictionary?.[language]?.[entity] || '';
}
