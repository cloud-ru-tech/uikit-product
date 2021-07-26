import { color, globals } from '@sbercloud/uikit-theme';
import { FC, useEffect, useLayoutEffect, useState } from 'react';

import { DEFAULT, DEPRECATED_COLOR, POSTMASSAGE_KEY } from '../../constants';
import { store } from '../../helpers/store';
import { tryParseJson } from '../../helpers/tryParseJson';
import { LanguageCodeType, Themes } from '../../types';

export interface ConfigProviderProps {
  languageCode?: LanguageCodeType;
  theme?: Themes;
}

interface ConfigProviderType extends FC<ConfigProviderProps> {
  themes: typeof Themes;
  languages: typeof LanguageCodeType;
}

export const ConfigProvider: ConfigProviderType = ({ languageCode, theme, children }) => {
  const [configTheme, setConfigTheme] = useState(DEFAULT.THEME);
  const [configLanguageCode, setConfigLanguageCodeTheme] = useState(DEFAULT.LANGUAGE);

  useEffect(() => {
    const html = document.getElementsByTagName('html')[0];
    /*-----------
    --- THEME --- 
    -----------*/

    const receiveChangeThemeMessage = (event: MessageEvent) => {
      const eventData = tryParseJson(event.data);
      if (eventData.key !== POSTMASSAGE_KEY.changeTheme) return;

      setConfigTheme(eventData.value);
    };
    window.addEventListener('message', receiveChangeThemeMessage, false);

    html.classList.add(globals, color);

    /*--------------
    --- LANGUAGE --- 
    --------------*/

    const receiveChangeLanguageMessage = (event: MessageEvent) => {
      const eventData = tryParseJson(event.data);
      if (eventData.key !== POSTMASSAGE_KEY.changeLanguage) return;
      setConfigLanguageCodeTheme(eventData.value);
    };
    window.addEventListener('message', receiveChangeLanguageMessage, false);

    return () => {
      window.removeEventListener('message', receiveChangeThemeMessage, false);
      window.removeEventListener('message', receiveChangeLanguageMessage, false);
    };
  }, []);

  /*-------------
  ---- THEME ----
  -------------*/

  useLayoutEffect(() => {
    store.theme = theme || DEFAULT.THEME;
    setConfigTheme(store.theme);
  }, [theme]);

  useEffect(() => {
    const html = document.getElementsByTagName('html')[0];
    html.classList.add(DEPRECATED_COLOR[configTheme]);
    html.setAttribute('data-theme', configTheme);
    window.postMessage(JSON.stringify({ key: POSTMASSAGE_KEY.changeThemeDone, value: configTheme }), location.origin);
  }, [configTheme]);

  /*--------------
  --- LANGUAGE --- 
  --------------*/

  useLayoutEffect(() => {
    store.languageCode = languageCode || DEFAULT.LANGUAGE;
    setConfigLanguageCodeTheme(store.languageCode);
  }, [languageCode]);

  useEffect(() => {
    window.postMessage(
      JSON.stringify({ key: POSTMASSAGE_KEY.changeLanguageDone, value: configLanguageCode }),
      location.origin,
    );
  }, [configLanguageCode]);

  return (
    <div id='sbercloud-theme-wrapper' data-theme={configTheme}>
      {children}
    </div>
  );
};

ConfigProvider.themes = Themes;
ConfigProvider.languages = LanguageCodeType;
