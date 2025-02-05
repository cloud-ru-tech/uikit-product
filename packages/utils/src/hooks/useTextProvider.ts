import { useCallback } from 'react';

import { LanguageCodeType } from '../types';
import { useLanguage } from './useLanguage';

type TextProviderFunction<T extends string> = (entity: T) => string;

export const useTextProvider = <T extends string>(
  textProvider: (language: LanguageCodeType, entity: T) => string,
): TextProviderFunction<T> => {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  return useCallback((entity: T) => textProvider(languageCode, entity), [languageCode, textProvider]);
};
