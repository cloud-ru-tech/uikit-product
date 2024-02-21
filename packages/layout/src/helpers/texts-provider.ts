import { createTextProvider, LanguageCodeType } from '@sbercloud/uikit-product-utils';

export enum Texts {
  NoAccessTitle = 'NoAccessTitle',
  NoAccessSubtitle = 'NoAccessSubtitle',
  NoAccessText = 'NoAccessText',
  Continue = 'continue',
  Create = 'create',
  Save = 'save',
  Cancel = 'cancel',
  Back = 'back',
}

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.NoAccessTitle]: 'Доступ ограничен',
    [Texts.NoAccessSubtitle]: 'У вас нет прав для просмотра этого контента.',
    [Texts.NoAccessText]: 'Для получения доступа обратитесь к администратору организации или проекта',
    [Texts.Continue]: 'Продолжить',
    [Texts.Create]: 'Создать',
    [Texts.Save]: 'Сохранить',
    [Texts.Cancel]: 'Отмена',
    [Texts.Back]: 'Назад',
  },
  [LanguageCodeType.enGB]: {
    [Texts.NoAccessTitle]: 'Access restricted',
    [Texts.NoAccessSubtitle]: "You don't have rights to view this content.",
    [Texts.NoAccessText]: 'To gain access, contact the administrator of the organization or project',
    [Texts.Continue]: 'Continue',
    [Texts.Create]: 'Create',
    [Texts.Save]: 'Save',
    [Texts.Cancel]: 'Cancel',
    [Texts.Back]: 'Back',
  },
};

export const textProvider = createTextProvider<Texts>(Dictionary, 'no-access');
