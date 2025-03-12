import { ExtendedDictionary, OverrideLocales } from '@snack-uikit/locale';

import { en_GB } from './en_GB';
import { ru_RU } from './ru_RU';

type ExtensionDictionary = typeof en_GB;

export const UIKIT_PRODUCT_LOCALES: ExtendedDictionary<ExtensionDictionary> = {
  'en-GB': en_GB,
  'ru-RU': ru_RU,
} as const;

export type OverrideUiKitProductLocales = OverrideLocales<ExtensionDictionary>;
