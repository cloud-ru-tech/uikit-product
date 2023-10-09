import { createTextProvider, LanguageCodeType } from '@sbercloud/uikit-product-utils';

export enum Texts {
  ClearData = 'ClearData',
  Value = 'Value',
  Contains = 'Contains',
  NotContain = 'NotContain',
}

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.ClearData]: 'Очистить данные',
    [Texts.Value]: 'Значение',
    [Texts.Contains]: 'Содержит',
    [Texts.NotContain]: 'Не содержит',
  },
  [LanguageCodeType.enGB]: {
    [Texts.ClearData]: 'Clear data',
    [Texts.Value]: 'Value',
    [Texts.Contains]: 'Contains',
    [Texts.NotContain]: 'Not contain',
  },
};

export const textProvider = createTextProvider<Texts, string>(Dictionary, 'filter-string');
