import { createTextProvider, LanguageCodeType } from '@sbercloud/uikit-product-utils';

export enum Texts {
  BackTo = 'backTo',
  Documentation = 'documentation',
}

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.BackTo]: 'Назад к',
    [Texts.Documentation]: 'Документация',
  },
  [LanguageCodeType.enGB]: {
    [Texts.BackTo]: 'Back to',
    [Texts.Documentation]: 'Documentation',
  },
};

export const textProvider = createTextProvider<Texts>(Dictionary, 'no-access');
