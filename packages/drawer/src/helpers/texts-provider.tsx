import { LanguageCodeType, createTextProvider } from '@sbercloud/uikit-utils';

import pkg from '../../package.json';

export enum Texts {
  Close = 'close',
}

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, string>>> = {
  [LanguageCodeType.ruRU]: {
    [Texts.Close]: 'Закрыть',
  },
  [LanguageCodeType.enGB]: {
    [Texts.Close]: 'Close',
  },
};

export const textProvider = createTextProvider<Texts>(Dictionary, pkg.name);
