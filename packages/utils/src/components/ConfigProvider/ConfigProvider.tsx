import { FC } from 'react';

import { useConfig } from '../../hooks/useConfig';
import { LanguageCodeType, Themes } from '../../types';

export type ConfigProviderProps = {
  languageCode?: LanguageCodeType;
  theme?: Themes;
};

type ConfigProviderType = {
  themes: typeof Themes;
  languages: typeof LanguageCodeType;
} & FC<ConfigProviderProps>;

export const ConfigProvider: ConfigProviderType = ({ languageCode, theme, children }) => {
  useConfig({ languageCode, theme });

  return <>{children}</>;
};

ConfigProvider.themes = Themes;
ConfigProvider.languages = LanguageCodeType;
