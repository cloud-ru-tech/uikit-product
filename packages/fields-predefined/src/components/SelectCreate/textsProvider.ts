import { createTextProvider, LanguageCodeType } from '@sbercloud/uikit-product-utils';

export enum Texts {
  ButtonCreate = 'button-create',
  ButtonCancel = 'button-cancel',
  ButtonRefetch = 'button-refetch',
  SelectPlaceholder = 'select-placeholder',
  NoData = 'no-data',
  NoResult = 'no-result',
  LoadError = 'load-error',
  ChangeRequest = 'change-request',
}

const dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.ButtonCreate]: 'Создать',
    [Texts.ButtonCancel]: 'Отмена',
    [Texts.ButtonRefetch]: 'Обновить',
    [Texts.SelectPlaceholder]: 'Не выбрано',
    [Texts.NoData]: 'не обнаружены',
    [Texts.NoResult]: 'не найдены',
    [Texts.ChangeRequest]: 'Измените запрос или создайте',
    [Texts.LoadError]: 'Не удалось загрузить',
  },
  [LanguageCodeType.enGB]: {
    [Texts.ButtonCreate]: 'Create',
    [Texts.ButtonCancel]: 'Cancel',
    [Texts.ButtonRefetch]: 'Refetch',
    [Texts.SelectPlaceholder]: 'Select option',
    [Texts.NoData]: 'not found',
    [Texts.NoResult]: 'not found',
    [Texts.LoadError]: 'Error occurred while loading',
    [Texts.ChangeRequest]: 'Change request or create new',
  },
};

export const textProvider = createTextProvider<Texts>(dictionary, 'fields-predefined');
