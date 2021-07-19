import { LanguageCodeType } from '@sbercloud/uikit-utils';

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
    approve: 'Confirm',
    cancel: 'Cancel',
  },
};

export function textProvider(language: LanguageCodeType, entity: Texts): string {
  return Dictionary?.[language]?.[entity] || '';
}
