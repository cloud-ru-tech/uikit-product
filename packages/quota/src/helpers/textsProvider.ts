import { createTextProvider, LanguageCodeType } from '@sbercloud/uikit-product-utils';

export enum Texts {
  Peace = 'peace',
  Created = 'created',
  Available = 'available',
  Exceeded = 'exceeded',
  Increase = 'increase',
  NoData = 'no-data',
  Quotas = 'quotas',
}

const dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.Peace]: 'шт.',
    [Texts.Created]: 'Создано',
    [Texts.Available]: 'Доступно по квоте',
    [Texts.Exceeded]: 'Квота исчерпана',
    [Texts.Increase]: 'Увеличить',
    [Texts.NoData]: 'Не удалось загрузить данные',
    [Texts.Quotas]: 'Квоты',
  },
  [LanguageCodeType.enGB]: {
    [Texts.Peace]: 'pcs.',
    [Texts.Created]: 'Created',
    [Texts.Available]: 'Available by quota',
    [Texts.Exceeded]: 'Quota exhausted',
    [Texts.Increase]: 'Increase',
    [Texts.NoData]: 'Failed to load data',
    [Texts.Quotas]: 'Quotas',
  },
};

export const textProvider = createTextProvider<Texts>(dictionary, 'quota');
