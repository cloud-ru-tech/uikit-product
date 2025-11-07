import { Dictionary, DottedTranslationKey, InterpolationObject, LocaleDictionary } from '@snack-uikit/locale';

import { UIKIT_PRODUCT_LOCALES } from '../locales';

export type LocaleComponentName<D extends Dictionary> = keyof LocaleDictionary<D>;

export type GetLocaleText<D extends Dictionary, T extends keyof LocaleDictionary<D> | undefined = undefined> = (
  key: DottedTranslationKey<D, T>,
  interpolation?: InterpolationObject,
) => string;

export type UIKitProductDictionary = (typeof UIKIT_PRODUCT_LOCALES)['en-GB'];
