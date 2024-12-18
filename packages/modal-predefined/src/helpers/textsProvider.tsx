import { createTextProvider, LanguageCodeType } from '@sbercloud/uikit-product-utils';

export enum Texts {
  Title = 'title',
  RecallTitle = 'recallTitle',
  // Sure = 'sure',
  FieldLabel = 'fieldLabel',
  RecallFieldLabel = 'recallFieldLabel',
  Required = 'required',
  InvalidName = 'invalidName',
  EnterName = 'enterName',
  Cancel = 'cancel',
  Delete = 'delete',
  Recall = 'recall',
  WhatsNew = 'whatsNew',
  ReadLater = 'readLater',
  OutOf = 'outOf',
  NoDataTitle = 'noDataTitle',
  NoDataDescription = 'noDataDescription',
  DataErrorTitle = 'dataErrorTitle',
  DataErrorDescription = 'dataErrorDescription',
  DataErrorAction = 'dataErrorAction',
}

export type DictionaryPropertyAsFn = (params: string) => string;
type DictionaryProperty = DictionaryPropertyAsFn | string;

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, DictionaryProperty>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.Title]: (objectType: string) => `Удаление ${objectType}`,
    [Texts.RecallTitle]: 'Отзыв заявки',
    [Texts.FieldLabel]: 'Чтобы разрешить удаление, введите:',
    [Texts.RecallFieldLabel]: 'Чтобы отозвать заявку, введите:',
    [Texts.EnterName]: 'Введите название',
    [Texts.Required]: 'Поле должно быть заполнено',
    [Texts.InvalidName]: 'Неверное название',
    [Texts.Cancel]: 'Отмена',
    [Texts.Delete]: 'Удалить',
    [Texts.Recall]: 'Отозвать',
    [Texts.WhatsNew]: 'Что нового',
    [Texts.ReadLater]: 'Ознакомиться позже',
    [Texts.OutOf]: 'из',
    [Texts.NoDataTitle]: 'Новостей пока нет',
    [Texts.NoDataDescription]: 'Скоро здесь появятся новости платформы',
    [Texts.DataErrorTitle]: 'Не удалось получить данные',
    [Texts.DataErrorDescription]: 'Попробуйте перезагрузить страницу',
    [Texts.DataErrorAction]: 'Обновить',
  },
  [LanguageCodeType.enGB]: {
    [Texts.Title]: (recordName: string) => `Delete ${recordName}`,
    [Texts.RecallTitle]: 'Withdrawal of application',
    [Texts.FieldLabel]: 'To do this, enter:',
    [Texts.RecallFieldLabel]: 'To withdraw your request, enter:',
    [Texts.EnterName]: 'Enter a name',
    [Texts.Required]: 'Field must be filled',
    [Texts.InvalidName]: 'Invalid name',
    [Texts.Cancel]: 'Cancel',
    [Texts.Delete]: 'Delete',
    [Texts.Recall]: 'Recall',
    [Texts.WhatsNew]: "What's new",
    [Texts.ReadLater]: 'Read later',
    [Texts.OutOf]: 'of',
    [Texts.NoDataTitle]: 'No news yet',
    [Texts.NoDataDescription]: 'Platform news will be here soon',
    [Texts.DataErrorTitle]: 'Could not load data',
    [Texts.DataErrorDescription]: 'Try to refresh the page',
    [Texts.DataErrorAction]: 'Refresh',
  },
};

export const textProvider = createTextProvider<Texts, DictionaryProperty>(Dictionary, 'modal-predefined');
