import { createTextProvider, LanguageCodeType } from '@sbercloud/uikit-product-utils';

export enum Texts {
  CloseAllButton = 'CloseAllButton',
}

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.CloseAllButton]: 'Закрыть все',
  },
  [LanguageCodeType.enGB]: {
    [Texts.CloseAllButton]: 'Close all',
  },
};

export const textProvider = createTextProvider<Texts>(Dictionary, 'notification');
