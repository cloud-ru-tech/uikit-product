import { createTextProvider, LanguageCodeType } from '@sbercloud/uikit-product-utils';

export enum Texts {
  SetPeriod = 'Set Period',
  ClearData = 'ClearData',
}

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.SetPeriod]: 'Настроить период',
    [Texts.ClearData]: 'Очистить данные',
  },
  [LanguageCodeType.enGB]: {
    [Texts.SetPeriod]: 'Set up a period',
    [Texts.ClearData]: 'Clear data',
  },
};

export const textProvider = createTextProvider<Texts, string>(Dictionary, 'datepicker');
