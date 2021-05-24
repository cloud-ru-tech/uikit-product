export enum Languages {
  En = 'en-GB',
  Ru = 'ru-RU',
}

export enum Texts {
  noRowsInitially = 'noRowsInitially',
  noRowsAfterSearch = 'noRowsAfterSearch',
  searchPlaceholder = 'searchPlaceholder',
}

const Dictionary: Record<Languages, Record<Texts, string>> = {
  [Languages.Ru]: {
    noRowsInitially: 'Нет данных',
    noRowsAfterSearch: 'Ничего не найдено :(',
    searchPlaceholder: 'Поиск',
  },
  [Languages.En]: {
    noRowsInitially: 'No data',
    noRowsAfterSearch: 'Nothing found :(',
    searchPlaceholder: 'Search',
  },
};

export function textProvider(language: Languages, entity: Texts): string {
  return Dictionary[language][entity];
}
