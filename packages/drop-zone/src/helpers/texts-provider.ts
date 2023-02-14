import { createTextProvider, LanguageCodeType } from '@sbercloud/uikit-product-utils';

export enum Texts {
  HeaderText = 'HeaderText',
}

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.HeaderText]: 'Перетащите файл сюда или загрузите его',
  },
  [LanguageCodeType.enGB]: {
    [Texts.HeaderText]: 'Drag and drop file here or upload',
  },
};

export const textProvider = createTextProvider<Texts>(Dictionary, 'DropZone');
