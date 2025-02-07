import { createTextProvider, LanguageCodeType } from '@sbercloud/uikit-product-utils';

export enum Texts {
  // HeroProduct
  Platforms = 'platforms',
  // PlatformLink
  Evolution = 'evolution',
  Vmware = 'vmware',
  Advanced = 'advanced',
  Mlspace = 'mlspace',
}

export type DictionaryPropertyAsFn = (params: string) => string;
type DictionaryProperty = DictionaryPropertyAsFn | string;

const Dictionary: Partial<Record<LanguageCodeType, Record<Texts, DictionaryProperty>>> = {
  [LanguageCodeType.ruRU]: {
    // HeroProduct
    [Texts.Platforms]: 'Платформы',
    // PlatformLink
    [Texts.Evolution]: 'Evolution',
    [Texts.Vmware]: 'Облако VMware',
    [Texts.Advanced]: 'Advanced',
    [Texts.Mlspace]: 'ML Space',
  },
  [LanguageCodeType.enGB]: {
    // HeroProduct
    [Texts.Platforms]: 'Platforms',
    // PlatformLink
    [Texts.Evolution]: 'Evolution',
    [Texts.Vmware]: 'VMware',
    [Texts.Advanced]: 'Advanced',
    [Texts.Mlspace]: 'ML Space',
  },
};

export const textProvider = createTextProvider<Texts, DictionaryProperty>(Dictionary, 'modal-predefined');
