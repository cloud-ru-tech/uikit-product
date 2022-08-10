import { createTextProvider, LanguageCodeType } from '@sbercloud/uikit-product-utils';

export enum Texts {
  HeaderText = 'HeaderText',
  LinkText = 'LinkText',
}

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.HeaderText]: 'Перетащите файл сюда или ',
    [Texts.LinkText]: 'загрузите его',
  },
  [LanguageCodeType.enGB]: {
    [Texts.HeaderText]: 'Drag and drop file here or ',
    [Texts.LinkText]: 'upload',
  },
};

export const textProvider = createTextProvider<Texts>(Dictionary, 'DropZone');
