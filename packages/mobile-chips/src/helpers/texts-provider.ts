import { createTextProvider, LanguageCodeType } from '@sbercloud/uikit-product-utils';

export enum Texts {
  SelectedN = 'selectedN',
  ResetAll = 'resetAll',
  Select = 'select',
}

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.SelectedN]: 'Выбрано: ',
    [Texts.ResetAll]: 'Сбросить все',
    [Texts.Select]: 'Выбрать',
  },
  [LanguageCodeType.enGB]: {
    [Texts.SelectedN]: 'Selected: ',
    [Texts.ResetAll]: 'Reset All',
    [Texts.Select]: 'Select',
  },
};

export const textProvider = createTextProvider<Texts>(Dictionary, 'mobile-chips');
