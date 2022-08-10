import { createTextProvider, LanguageCodeType } from '@sbercloud/uikit-product-utils';

export type EnabledLanguages = LanguageCodeType.ruRU | LanguageCodeType.enGB;

export enum Texts {
  NoRowsInitially = 'NoRowsInitially',
  NoRowsAfterSearch = 'NoRowsAfterSearch',
  NoRowsAfterSearchDescription = 'NoRowsAfterSearchDescription',
}

const Dictionary: Record<EnabledLanguages, Record<Texts, string>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.NoRowsInitially]: 'Нет данных',
    [Texts.NoRowsAfterSearch]: 'Ничего не найдено',
    [Texts.NoRowsAfterSearchDescription]: 'Попробуйте изменить запрос',
  },
  [LanguageCodeType.enGB]: {
    [Texts.NoRowsInitially]: 'No data',
    [Texts.NoRowsAfterSearch]: 'Nothing found',
    [Texts.NoRowsAfterSearchDescription]: 'Try changing your request',
  },
};

export const textProvider = createTextProvider<Texts>(Dictionary, 'table-private');
