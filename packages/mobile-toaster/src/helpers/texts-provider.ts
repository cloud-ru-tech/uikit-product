import { createTextProvider, LanguageCodeType } from '@sbercloud/uikit-product-utils';

export enum Texts {
  CloseAll = 'closeAll',
  ShowLess = 'showLess',
  ShowMore = 'showMore',
}

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.CloseAll]: 'Закрыть все',
    [Texts.ShowLess]: 'Показать меньше',
    [Texts.ShowMore]: 'Показать больше',
  },
  [LanguageCodeType.enGB]: {
    [Texts.CloseAll]: 'Close all',
    [Texts.ShowLess]: 'Show less',
    [Texts.ShowMore]: 'Show more',
  },
};

export const textProvider = createTextProvider<Texts>(Dictionary, 'mobile-toaster');
