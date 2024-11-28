import { PropsWithChildren } from 'react';

import { useConfig } from '../../hooks/useConfig';
import { Brand, LanguageCodeType, Themes } from '../../types';

export type ConfigProviderProps = PropsWithChildren<{
  languageCode?: LanguageCodeType;
  theme?: Themes;
  brand?: Brand;
}>;

export function ConfigProvider({ languageCode, theme, brand, children }: ConfigProviderProps) {
  useConfig({ languageCode, theme, brand });

  return <>{children}</>;
}

ConfigProvider.brand = Brand;
ConfigProvider.themes = Themes;
ConfigProvider.languages = LanguageCodeType;
