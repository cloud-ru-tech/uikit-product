import { Dictionary, DottedTranslationKey, LocaleDictionary } from '@snack-uikit/locale';

import { UIKIT_PRODUCT_LOCALES } from '../locales';

export type LocaleComponentName<D extends Dictionary> = keyof LocaleDictionary<D>;

export type GetLocaleText<D extends Dictionary, T extends keyof LocaleDictionary<D> | undefined = undefined> = (
  key: DottedTranslationKey<D, T>,
) => string;

export type UIKitProductDictionary = (typeof UIKIT_PRODUCT_LOCALES)['en-GB'];
