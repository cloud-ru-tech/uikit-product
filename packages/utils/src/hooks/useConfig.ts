import { useCallback, useEffect, useRef, useState } from 'react';

import CloudBrandThemes from '@sbercloud/figma-tokens-cloud-platform/build/css/brand.module.css';
import MLSpaceBrandThemes from '@sbercloud/figma-tokens-mlspace/build/css/brand.module.css';
import { isBrowser, useLayoutEffect } from '@snack-uikit/utils';

import { POST_MESSAGE_KEY } from '../constants/environment';
import { tryParseJson } from '../helpers/tryParseJson';
import { LanguageCodeType, Themes } from '../types';
import { getCustomStore } from './private/getCustomStore';

type UseConfigProps = {
  languageCode?: LanguageCodeType;
  theme?: Themes;
};

const themeMap = {
  [Themes.Green]: CloudBrandThemes.light,
  [Themes.GreenDark]: CloudBrandThemes.dark,
  [Themes.Purple]: MLSpaceBrandThemes.light,
  [Themes.PurpleDark]: MLSpaceBrandThemes.dark,
};

export function useConfig({ languageCode, theme }: UseConfigProps) {
  const store = getCustomStore({ theme, languageCode });
  const [configLanguageCode, setConfigLanguageCodeTheme] = useState(store.languageCode);
  const previousThemeRef = useRef<Themes>();

  const updateTheme = useCallback(
    (newTheme: Themes) => {
      if (isBrowser()) {
        store.theme = newTheme;

        const html = document.getElementsByTagName('html')[0];

        if (previousThemeRef.current) {
          html.classList.remove(themeMap[previousThemeRef.current]);
        }

        html.setAttribute('data-theme', newTheme);

        const body = document.getElementsByTagName('body')[0];
        body.setAttribute('data-theme', newTheme);

        html.classList.add(themeMap[newTheme]);

        window.postMessage(JSON.stringify({ key: POST_MESSAGE_KEY.changeThemeDone, value: newTheme }), location.origin);

        previousThemeRef.current = newTheme;
      }
    },
    [store],
  );

  useEffect(() => {
    /*-----------
        --- THEME ---
        -----------*/

    const receiveChangeThemeMessage = (event: MessageEvent) => {
      const eventData = tryParseJson(event.data);

      if (eventData.key !== POST_MESSAGE_KEY.changeTheme) {
        return;
      }

      updateTheme(eventData.value);
    };

    window.addEventListener('message', receiveChangeThemeMessage, false);

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
  }, [updateTheme]);

  /*-------------
    ---- THEME ----
    -------------*/

  // need to do it this way to update theme before any other child component render & useEffect/useLayoutEffect
  if (previousThemeRef.current !== theme && theme) {
    updateTheme(theme);
  }

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
}
