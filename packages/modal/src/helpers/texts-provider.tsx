import { LanguageCodeType } from '@sbercloud/uikit-react-localization';

export enum Texts {
  approve = 'approve',
  cancel = 'cancel',
}

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    approve: 'Подтвердить',
    cancel: 'Отмена',
  },
  [LanguageCodeType.enGB]: {
    approve: 'Approve',
    cancel: 'Cancel',
  },
};

export function textProvider(language: LanguageCodeType, entity: Texts): string {
  return Dictionary?.[language]?.[entity] || '';
}
