import { LanguageCodeType } from '@sbercloud/uikit-react-localization';

export enum Texts {
  hide = 'hide',
  show = 'show',
}

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    hide: 'Свернуть',
    show: 'Читать полностью',
  },
  [LanguageCodeType.enGB]: {
    hide: 'Collapse',
    show: 'Read more',
  },
};

export function textProvider(language: LanguageCodeType, entity: Texts): string {
  return Dictionary?.[language]?.[entity] || '';
}
