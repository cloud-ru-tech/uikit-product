import merge from 'lodash.merge';
import { useMemo } from 'react';

import {
  Dictionary,
  LocaleLang,
  LocaleProvider as SnackLocaleProvider,
  LocaleProviderProps,
  useLocale as snackUseLocale,
} from '@snack-uikit/locale';

import { AdditionalTranslations } from '../helpers';
import { UIKIT_PRODUCT_LOCALES } from '../locales';
import { resolveCommonTranslations } from '../locales/resolveCommonTranslations';
import { GetLocaleText, LocaleComponentName, UIKitProductDictionary } from './types';

export type ProductLocaleProviderProps<
  D extends Dictionary,
  AT extends AdditionalTranslations,
> = LocaleProviderProps<D> & {
  /**
   * Общий словарь переводов
   */
  additionalTranslationsResources: AT;
};

export function LocaleProvider<D extends Dictionary, AT extends AdditionalTranslations>({
  children,
  overrideLocales,
  lang,
  fallbackLang = 'ru-RU',
  additionalTranslationsResources,
}: ProductLocaleProviderProps<D, AT>) {
  const memoizedLocales = useMemo(
    () =>
      merge(
        {},
        UIKIT_PRODUCT_LOCALES,
        /* Тип обязывает прокинуть доп. переводы, но если это не сделать, ничего не упадет */
        additionalTranslationsResources ? resolveCommonTranslations(additionalTranslationsResources) : {},
        overrideLocales,
      ),
    [overrideLocales, additionalTranslationsResources],
  );

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
