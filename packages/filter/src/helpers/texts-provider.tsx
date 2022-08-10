import { createTextProvider, LanguageCodeType } from '@sbercloud/uikit-product-utils';

export enum Texts {
  AddFilter = 'addFilter',
  Reset = 'reset',
  Include = 'include',
  NoInclude = 'noInclude',
  Eq = 'eq',
  Neq = 'neq',
  Lt = 'lt',
  Lte = 'lte',
  Gt = 'gt',
  Gte = 'gte',
}

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.AddFilter]: 'Добавить фильтр',
    [Texts.Reset]: 'Сбросить',
    [Texts.Include]: 'Содержит',
    [Texts.NoInclude]: 'Не содержит',
    [Texts.Eq]: 'Равно',
    [Texts.Neq]: 'Не равно',
    [Texts.Lt]: 'Меньше чем',
    [Texts.Lte]: 'Меньше чем или равно',
    [Texts.Gt]: 'Больше чем',
    [Texts.Gte]: 'Больше чем или равно',
  },
  [LanguageCodeType.enGB]: {
    [Texts.AddFilter]: 'Add filter',
    [Texts.Reset]: 'Reset',
    [Texts.Include]: 'Contains',
    [Texts.NoInclude]: 'Does not contain',
    [Texts.Eq]: 'Equal to',
    [Texts.Neq]: 'Not equal to',
    [Texts.Lt]: 'Less than',
    [Texts.Lte]: 'Less than or equal to',
    [Texts.Gt]: 'More than',
    [Texts.Gte]: 'More than or equal to',
  },
};

export const textProvider = createTextProvider<Texts>(Dictionary, 'filter');
