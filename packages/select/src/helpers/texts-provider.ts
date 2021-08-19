import { LanguageCodeType } from '@sbercloud/uikit-utils';

import declination from './declination';

export enum Texts {
  noData = 'noData',
  selectPlaceholder = 'selectPlaceholder',
  modalDeleteTagTitle = 'modalDeleteTagTitle',
  modalDeleteTagDesc = 'modalDeleteTagDesc',
  selectValue = 'selectValue',
  selected = 'selected',
  add = 'add',
  usersSelected = 'usersSelected',
  search = 'search',
  edit = 'edit',
  select = 'select',
  delete = 'delete',
}

export type DictionaryPropertyAsFn = (params: Record<string, string | number>) => string;
type DictionaryProperty = DictionaryPropertyAsFn | string;

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, DictionaryProperty>>> = {
  [LanguageCodeType.ruRU]: {
    noData: 'Нет данных',
    selectPlaceholder: 'Выберите',
    modalDeleteTagTitle: 'Удаление тега',
    modalDeleteTagDesc: ({ label }) => `Вы действительно хотите удалить тег «${label}»?`,
    selectValue: 'Выберите значение',
    selected: ({ count }) => `Выбрано: ${count}`,
    add: 'Добавить',
    usersSelected: declination((number: number) => [
      `Выбран ${number} пользователь`,
      `Выбрано ${number} пользователя`,
      `Выбрано ${number} пользователей`,
    ]),
    search: 'Поиск',
    edit: 'Редактировать',
    select: 'Выбрать',
    delete: 'Удалить',
  },
  [LanguageCodeType.enGB]: {
    noData: 'No data',
    selectPlaceholder: 'Select',
    modalDeleteTagTitle: 'Delete tag',
    modalDeleteTagDesc: ({ label }) => `Do you really want to delete the tag ${label}?`,
    selectValue: 'Select a value',
    selected: ({ count }) => `Selected: ${count}`,
    add: 'Add',
    usersSelected: declination((number: number) => [
      `${number} user selected`,
      `${number} users selected`,
      `${number} users selected`,
    ]),
    search: 'Search',
    edit: 'Edit',
    select: 'Select',
    delete: 'Delete',
  },
};

export function textProvider<T extends DictionaryProperty>(language: LanguageCodeType, entity: Texts): T {
  return (Dictionary?.[language]?.[entity] || '') as T;
}
