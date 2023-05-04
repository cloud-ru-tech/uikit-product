import { PropsWithChildren } from 'react';

import { useConfig } from '../../hooks/useConfig';
import { LanguageCodeType, Themes } from '../../types';

export type ConfigProviderProps = PropsWithChildren<{
  languageCode?: LanguageCodeType;
  theme?: Themes;
}>;

export function ConfigProvider({ languageCode, theme, children }: ConfigProviderProps) {
  useConfig({ languageCode, theme });

  return <>{children}</>;
}

ConfigProvider.themes = Themes;
ConfigProvider.languages = LanguageCodeType;
