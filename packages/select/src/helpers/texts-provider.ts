import { createTextProvider, LanguageCodeType } from '@sbercloud/uikit-product-utils';

import { declination } from './declination';

export enum Texts {
  NoData = 'NoData',
  SelectPlaceholder = 'SelectPlaceholder',
  ModalDeleteTagTitle = 'ModalDeleteTagTitle',
  ModalDeleteTagDesc = 'ModalDeleteTagDesc',
  SelectValue = 'SelectValue',
  Selected = 'Selected',
  Add = 'Add',
  UsersSelected = 'UsersSelected',
  Search = 'Search',
  Edit = 'Edit',
  Select = 'Select',
  Delete = 'Delete',
}

export type DictionaryPropertyAsFn = (params: Record<string, string | number>) => string;
type DictionaryProperty = DictionaryPropertyAsFn | string;

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, DictionaryProperty>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.NoData]: 'Нет данных',
    [Texts.SelectPlaceholder]: 'Не выбрано',
    [Texts.ModalDeleteTagTitle]: 'Удаление тега',
    [Texts.ModalDeleteTagDesc]: ({ label }) => `Вы действительно хотите удалить тег «${label}»?`,
    [Texts.SelectValue]: 'Выберите значение',
    [Texts.Selected]: ({ count }) => `Выбрано: ${count}`,
    [Texts.Add]: 'Добавить',
    [Texts.UsersSelected]: declination((number: number) => [
      `Выбран ${number} пользователь`,
      `Выбрано ${number} пользователя`,
      `Выбрано ${number} пользователей`,
    ]),
    [Texts.Search]: 'Поиск',
    [Texts.Edit]: 'Редактировать',
    [Texts.Select]: 'Выбрать',
    [Texts.Delete]: 'Удалить',
  },
  [LanguageCodeType.enGB]: {
    [Texts.NoData]: 'No data',
    [Texts.SelectPlaceholder]: 'Not selected',
    [Texts.ModalDeleteTagTitle]: 'Delete tag',
    [Texts.ModalDeleteTagDesc]: ({ label }) => `Do you really want to delete the tag ${label}?`,
    [Texts.SelectValue]: 'Select a value',
    [Texts.Selected]: ({ count }) => `Selected: ${count}`,
    [Texts.Add]: 'Add',
    [Texts.UsersSelected]: declination((number: number) => [
      `${number} user selected`,
      `${number} users selected`,
      `${number} users selected`,
    ]),
    [Texts.Search]: 'Search',
    [Texts.Edit]: 'Edit',
    [Texts.Select]: 'Select',
    [Texts.Delete]: 'Delete',
  },
};

export const textProvider = createTextProvider<Texts, DictionaryProperty>(Dictionary, 'select');
