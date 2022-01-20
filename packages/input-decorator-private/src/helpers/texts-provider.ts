import { LanguageCodeType, createTextProvider } from '@sbercloud/uikit-utils';

import pkg from '../../package.json';

export enum Texts {
  Optional = 'Optional',
}

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.Optional]: 'Опционально',
  },
  [LanguageCodeType.enGB]: {
    [Texts.Optional]: 'Optional',
  },
};

export const textProvider = createTextProvider<Texts>(Dictionary, pkg.name);
