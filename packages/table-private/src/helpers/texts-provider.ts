import { LanguageCodeType, createTextProvider } from '@sbercloud/uikit-product-utils';

export type EnabledLanguages = LanguageCodeType.ruRU | LanguageCodeType.enGB;

export enum Texts {
  NoRowsInitially = 'NoRowsInitially',
  NoRowsAfterSearch = 'NoRowsAfterSearch',
}

const Dictionary: Record<EnabledLanguages, Record<Texts, string>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.NoRowsInitially]: 'Нет данных',
    [Texts.NoRowsAfterSearch]: 'Ничего не найдено :(',
  },
  [LanguageCodeType.enGB]: {
    [Texts.NoRowsInitially]: 'No data',
    [Texts.NoRowsAfterSearch]: 'Nothing found :(',
  },
};

export const textProvider = createTextProvider<Texts>(Dictionary, 'table-private');
