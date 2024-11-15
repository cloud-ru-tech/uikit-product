import { createTextProvider, LanguageCodeType } from '@sbercloud/uikit-product-utils';

export enum Texts {
  Continue = 'continue',
  Create = 'create',
  Save = 'save',
  Cancel = 'cancel',
  Back = 'back',
  Rent = 'rent',
  Send = 'send',
  Restore = 'restore',
}

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.Continue]: 'Продолжить',
    [Texts.Create]: 'Создать',
    [Texts.Save]: 'Сохранить',
    [Texts.Cancel]: 'Отмена',
    [Texts.Back]: 'Назад',
    [Texts.Rent]: 'Арендовать',
    [Texts.Send]: 'Отправить',
    [Texts.Restore]: 'Восстановить',
  },
  [LanguageCodeType.enGB]: {
    [Texts.Continue]: 'Continue',
    [Texts.Create]: 'Create',
    [Texts.Save]: 'Save',
    [Texts.Cancel]: 'Cancel',
    [Texts.Back]: 'Back',
    [Texts.Rent]: 'Rent',
    [Texts.Send]: 'Send',
    [Texts.Restore]: 'Restore',
  },
};

export const textProvider = createTextProvider<Texts>(Dictionary, 'no-access');
