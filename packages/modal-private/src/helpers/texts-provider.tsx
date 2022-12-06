import { createTextProvider, LanguageCodeType } from '@sbercloud/uikit-product-utils';

export enum Texts {
  Approve = 'Аpprove',
  Cancel = 'Сancel',
  Close = 'Сlose',
}

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.Approve]: 'Подтвердить',
    [Texts.Cancel]: 'Отмена',
    [Texts.Close]: 'Закрыть',
  },
  [LanguageCodeType.enGB]: {
    [Texts.Approve]: 'Confirm',
    [Texts.Cancel]: 'Cancel',
    [Texts.Close]: 'Close',
  },
};

export const textProvider = createTextProvider<Texts>(Dictionary, 'modal');
