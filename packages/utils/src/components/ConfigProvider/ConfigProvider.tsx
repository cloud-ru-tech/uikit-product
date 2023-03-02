import { FC, useEffect, useLayoutEffect, useState } from 'react';

import CloudBrandThemes from '@sbercloud/figma-tokens-cloud-platform/build/css/brand.module.css';
import MLSpaceBrandThemes from '@sbercloud/figma-tokens-mlspace/build/css/brand.module.css';
import { color, globals } from '@sbercloud/uikit-product-theme';

import { DEPRECATED_COLOR, POST_MESSAGE_KEY } from '../../constants';
import { tryParseJson } from '../../helpers/tryParseJson';
import { getCustomStore } from '../../hooks/private/getCustomStore';
import { LanguageCodeType, Themes } from '../../types';

export type ConfigProviderProps = {
  languageCode?: LanguageCodeType;
  theme?: Themes;
};

type ConfigProviderType = {
  themes: typeof Themes;
  languages: typeof LanguageCodeType;
} & FC<ConfigProviderProps>;

const themeMap = {
  [Themes.Green]: CloudBrandThemes.light,
  [Themes.GreenDark]: CloudBrandThemes.dark,
  [Themes.Purple]: MLSpaceBrandThemes.light,
  [Themes.PurpleDark]: MLSpaceBrandThemes.dark,
};

export const ConfigProvider: ConfigProviderType = ({ languageCode, theme, children }) => {
  const store = getCustomStore({ theme, languageCode });
  const [configTheme, setConfigTheme] = useState(store.theme);
  const [configLanguageCode, setConfigLanguageCodeTheme] = useState(store.languageCode);

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    /*-----------
    --- THEME --- 
    -----------*/

    const receiveChangeThemeMessage = (event: MessageEvent) => {
      const eventData = tryParseJson(event.data);
      if (eventData.key !== POST_MESSAGE_KEY.changeTheme) return;

      setConfigTheme(eventData.value);
    };
    window.addEventListener('message', receiveChangeThemeMessage, false);

    body.classList.add(globals, color);

    /*--------------
    --- LANGUAGE --- 
    --------------*/

    const receiveChangeLanguageMessage = (event: MessageEvent) => {
      const eventData = tryParseJson(event.data);
      if (eventData.key !== POST_MESSAGE_KEY.changeLanguage) return;
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
    if (theme) {
      store.theme = theme;
      setConfigTheme(store.theme);
    }
  }, [store, theme]);

  useEffect(() => {
    const html = document.getElementsByTagName('html')[0];
    html.setAttribute('data-theme', configTheme);

    const body = document.getElementsByTagName('body')[0];
    body.setAttribute('data-theme', configTheme);

    html.classList.add(DEPRECATED_COLOR[configTheme]);
    html.classList.add(themeMap[configTheme]);

    window.postMessage(JSON.stringify({ key: POST_MESSAGE_KEY.changeThemeDone, value: configTheme }), location.origin);

    return () => {
      html.classList.remove(DEPRECATED_COLOR[configTheme]);
      html.classList.remove(themeMap[configTheme]);
    };
  }, [configTheme]);

  /*--------------
  --- LANGUAGE --- 
  --------------*/

  useLayoutEffect(() => {
    if (languageCode) {
      store.languageCode = languageCode;
      setConfigLanguageCodeTheme(store.languageCode);
    }
  }, [languageCode, store]);

  useEffect(() => {
    window.postMessage(
      JSON.stringify({ key: POST_MESSAGE_KEY.changeLanguageDone, value: configLanguageCode }),
      location.origin,
    );
  }, [configLanguageCode]);

  return <>{children}</>;
};

ConfigProvider.themes = Themes;
ConfigProvider.languages = LanguageCodeType;
