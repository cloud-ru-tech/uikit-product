import { LanguageCodeType, createTextProvider } from '@sbercloud/uikit-utils';

import pkg from '../../package.json';

export enum Texts {
  Hide = 'hide',
  Show = 'show',
}

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.Hide]: 'Свернуть',
    [Texts.Show]: 'Читать полностью',
  },
  [LanguageCodeType.enGB]: {
    [Texts.Hide]: 'Collapse',
    [Texts.Show]: 'Read more',
  },
};

export const textProvider = createTextProvider<Texts>(Dictionary, pkg.name);
