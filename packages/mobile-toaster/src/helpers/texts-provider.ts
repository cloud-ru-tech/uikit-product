import { createTextProvider, LanguageCodeType } from '@sbercloud/uikit-product-utils';

export enum Texts {
  CloseAll = 'closeAll',
  ShowLess = 'showLess',
  ShowMore = 'showMore',
}

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.CloseAll]: 'Закрыть все',
    [Texts.ShowLess]: 'Свернуть',
    [Texts.ShowMore]: 'Развернуть',
  },
  [LanguageCodeType.enGB]: {
    [Texts.CloseAll]: 'Close all',
    [Texts.ShowLess]: 'Collapse',
    [Texts.ShowMore]: 'Expand',
  },
};

export const textProvider = createTextProvider<Texts>(Dictionary, 'mobile-toaster');
