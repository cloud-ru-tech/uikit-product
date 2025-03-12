import merge from 'lodash.merge';
import { useMemo } from 'react';

import {
  Dictionary,
  LocaleLang,
  LocaleProvider as SnackLocaleProvider,
  LocaleProviderProps,
  useLocale as snackUseLocale,
} from '@snack-uikit/locale';

import { UIKIT_PRODUCT_LOCALES } from '../locales';
import { GetLocaleText, LocaleComponentName, UIKitProductDictionary } from './types';

export function LocaleProvider<D extends Dictionary>({
  children,
  overrideLocales,
  lang,
  fallbackLang = 'ru-RU',
}: LocaleProviderProps<D>) {
  const memoizedLocales = useMemo(() => merge({}, UIKIT_PRODUCT_LOCALES, overrideLocales), [overrideLocales]);

  return (
    <SnackLocaleProvider lang={lang} overrideLocales={memoizedLocales} fallbackLang={fallbackLang}>
      {children}
    </SnackLocaleProvider>
  );
}

export function useLocale(): { t: GetLocaleText<UIKitProductDictionary>; lang: LocaleLang };
export function useLocale<
  C extends LocaleComponentName<UIKitProductDictionary> = LocaleComponentName<UIKitProductDictionary>,
>(componentName: C): { t: GetLocaleText<UIKitProductDictionary, C>; lang: LocaleLang };
export function useLocale<
  C extends LocaleComponentName<UIKitProductDictionary> = LocaleComponentName<UIKitProductDictionary>,
>(componentName?: C): { t: GetLocaleText<UIKitProductDictionary>; lang: LocaleLang } {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return snackUseLocale(componentName);
}
