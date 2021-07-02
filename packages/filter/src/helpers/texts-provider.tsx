import { LanguageCodeType } from '@sbercloud/uikit-react-localization';

export enum Texts {
  addFilter = 'addFilter',
  reset = 'reset',
  include = 'include',
  noInclude = 'noInclude',
  eq = 'eq',
  neq = 'neq',
  lt = 'lt',
  lte = 'lte',
  gt = 'gt',
  gte = 'gte',
}

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    addFilter: 'Добавить фильтр',
    reset: 'Сбросить',
    include: 'Содержит',
    noInclude: 'Не содержит',
    eq: 'Равно',
    neq: 'Не равно',
    lt: 'Меньше чем',
    lte: 'Меньше чем или равно',
    gt: 'Больше чем',
    gte: 'Больше чем или равно',
  },
  [LanguageCodeType.enGB]: {
    addFilter: 'Add a filter',
    reset: 'Reset',
    include: 'Contain',
    noInclude: 'Does not contain',
    eq: 'equal',
    neq: 'Not equal to',
    lt: 'Less than',
    lte: 'Less than or equal to',
    gt: 'Greater than',
    gte: 'Greater than or equal to',
  },
};

export function textProvider(language: LanguageCodeType, entity: Texts): string {
  return Dictionary?.[language]?.[entity] || '';
}
