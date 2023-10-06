import { createTextProvider, LanguageCodeType } from '@sbercloud/uikit-product-utils';

export enum Texts {
  SetRange = 'SetRange',
  ClearData = 'ClearData',
  Value = 'Value',
  From = 'From',
  To = 'To',
  Equal = 'Equal',
  NotEqual = 'NotEqual',
  More = 'More',
  Less = 'Less',
}

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.SetRange]: 'Настроить диапазон',
    [Texts.ClearData]: 'Очистить данные',
    [Texts.Value]: 'Значение',
    [Texts.From]: 'от',
    [Texts.To]: 'до',
    [Texts.Equal]: 'Равно',
    [Texts.NotEqual]: 'Не равно',
    [Texts.More]: 'Больше',
    [Texts.Less]: 'Меньше',
  },
  [LanguageCodeType.enGB]: {
    [Texts.SetRange]: 'Set up a range',
    [Texts.ClearData]: 'Clear data',
    [Texts.Value]: 'Value',
    [Texts.From]: 'from',
    [Texts.To]: 'to',
    [Texts.Equal]: 'Equal',
    [Texts.NotEqual]: 'Not equal',
    [Texts.More]: 'More',
    [Texts.Less]: 'Less',
  },
};

export const textProvider = createTextProvider<Texts, string>(Dictionary, 'datepicker');
