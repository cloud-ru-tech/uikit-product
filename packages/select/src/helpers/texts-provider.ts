import { LanguageCodeType } from '@sbercloud/uikit-react-localization';

import declination from './declination';

export enum Texts {
  noData = 'noData',
  searchPlaceholder = 'searchPlaceholder',
  selectPlaceholder = 'selectPlaceholder',
  modalDeleteTagTitle = 'modalDeleteTagTitle',
  modalDeleteTagDesc = 'modalDeleteTagDesc',
  selectValue = 'selectValue',
  selected = 'selected',
  add = 'add',
  usersSelected = 'usersSelected',
  search = 'search',
}

export type DictionaryPropertyAsFn = (params: Record<string, string | number>) => string;
type DictionaryProperty = DictionaryPropertyAsFn | string;

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, DictionaryProperty>>> = {
  [LanguageCodeType.ruRU]: {
    noData: 'Нет данных',
    searchPlaceholder: 'Поиск',
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
  },
  [LanguageCodeType.enGB]: {
    noData: 'No data',
    searchPlaceholder: 'Search',
    selectPlaceholder: 'Select',
    modalDeleteTagTitle: 'Deleting a tag',
    modalDeleteTagDesc: ({ label }) => `Do you really want to delete «${label}»?`,
    selectValue: 'Select a value',
    selected: ({ count }) => `${count} selected`,
    add: 'Add',
    usersSelected: declination((number: number) => [
      `${number} user selected`,
      `${number} users selected`,
      `${number} users selected`,
    ]),
    search: 'Search',
  },
};

export function textProvider<T extends DictionaryProperty>(language: LanguageCodeType, entity: Texts): T {
  return (Dictionary?.[language]?.[entity] || '') as T;
}
