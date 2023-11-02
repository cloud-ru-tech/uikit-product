import { createTextProvider, LanguageCodeType } from '@sbercloud/uikit-product-utils';

export enum Texts {
  Sure = 'sure',
  FieldLabel = 'fieldLabel',
  Required = 'required',
  InvalidName = 'invalidName',
  EnterName = 'enterName',
  Cancel = 'cancel',
  Delete = 'delete',
}

export type DictionaryPropertyAsFn = (params: string) => string;
type DictionaryProperty = DictionaryPropertyAsFn | string;

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, DictionaryProperty>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.Sure]: (recordName: string) => `Вы действительно хотите удалить ${recordName} `,
    [Texts.FieldLabel]: 'Для этого введите:',
    [Texts.EnterName]: 'Введите название',
    [Texts.Required]: 'Поле должно быть заполнено',
    [Texts.InvalidName]: 'Неверное название',
    [Texts.Cancel]: 'Отменить',
    [Texts.Delete]: 'Удалить',
  },
  [LanguageCodeType.enGB]: {
    [Texts.Sure]: (recordName: string) => `Do you really want to delete ${recordName} `,
    [Texts.FieldLabel]: 'To do this, enter:',
    [Texts.EnterName]: 'Enter a name',
    [Texts.Required]: 'Field must be filled',
    [Texts.InvalidName]: 'Invalid name',
    [Texts.Cancel]: 'Cancel',
    [Texts.Delete]: 'Delete',
  },
};

export const textProvider = createTextProvider<Texts, DictionaryProperty>(Dictionary, 'confirm-delete-modal');
