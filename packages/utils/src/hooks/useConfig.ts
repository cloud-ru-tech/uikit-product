import { useCallback, useEffect, useRef, useState } from 'react';

import AdminBrandThemes from '@sbercloud/figma-tokens-admin/build/css/brand.module.css';
import CloudBrandThemes from '@sbercloud/figma-tokens-cloud-platform/build/css/brand.module.css';
import MLSpaceBrandThemes from '@sbercloud/figma-tokens-mlspace/build/css/brand.module.css';
import SiteBrandThemes from '@sbercloud/figma-tokens-web/build/css/brand.module.css';
import { isBrowser, useLayoutEffect } from '@snack-uikit/utils';

import { POST_MESSAGE_KEY } from '../constants/environment';
import { tryParseJson } from '../helpers/tryParseJson';
import { Brand, LanguageCodeType, Themes } from '../types';
import { getCustomStore } from './private/getCustomStore';

type UseConfigProps = {
  languageCode?: LanguageCodeType;
  theme?: Themes;
  brand?: Brand;
};

const themeMap = {
  [Themes.Green]: CloudBrandThemes.light,
  [Themes.GreenDark]: CloudBrandThemes.dark,
  [Themes.Purple]: MLSpaceBrandThemes.light,
  [Themes.PurpleDark]: MLSpaceBrandThemes.dark,
};

const brandMap = {
  [Brand.Cloud]: CloudBrandThemes.light,
  [Brand.CloudDark]: CloudBrandThemes.dark,
  [Brand.MLSpace]: MLSpaceBrandThemes.light,
  [Brand.MLSpaceDark]: MLSpaceBrandThemes.dark,
  [Brand.Admin]: AdminBrandThemes.light,
  [Brand.AdminDark]: AdminBrandThemes.dark,
  [Brand.Site]: SiteBrandThemes.light,
  [Brand.SiteDark]: SiteBrandThemes.dark,
};

export function useConfig({ languageCode, theme, brand }: UseConfigProps) {
  const store = getCustomStore({ brand, theme, languageCode });
  const [configLanguageCode, setConfigLanguageCodeTheme] = useState(store.languageCode);
  const previousThemeRef = useRef<Themes>();
  const previousBrandRef = useRef<Brand>();

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

  const updateBrand = useCallback(
    (newBrand: Brand) => {
      if (isBrowser()) {
        store.brand = newBrand;

        const html = document.getElementsByTagName('html')[0];

        if (previousBrandRef.current) {
          html.classList.remove(brandMap[previousBrandRef.current]);
        }

        html.setAttribute('data-brand', newBrand);

        const body = document.getElementsByTagName('body')[0];
        body.setAttribute('data-brand', newBrand);

        html.classList.add(brandMap[newBrand]);

        window.postMessage(JSON.stringify({ key: POST_MESSAGE_KEY.changeBrandDone, value: newBrand }), location.origin);

        previousBrandRef.current = newBrand;
      }
    },
    [store],
  );

  useEffect(() => {
    /*-----------
        --- THEME/BRAND ---
        -----------*/

    const receiveChangeThemeMessage = (event: MessageEvent) => {
      const eventData = tryParseJson(event.data);

      switch (eventData.key) {
        case POST_MESSAGE_KEY.changeTheme:
          updateTheme(eventData.value);
          break;

        case POST_MESSAGE_KEY.changeBrand:
          updateBrand(eventData.value);
          break;

        default:
          return;
      }
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
  }, [updateBrand, updateTheme]);

  /*-------------
    ---- THEME ----
    -------------*/

  // need to do it this way to update theme before any other child component render & useEffect/useLayoutEffect
  if (previousThemeRef.current !== theme && theme) {
    updateTheme(theme);
  }

  if (previousBrandRef.current !== brand && brand) {
    updateBrand(brand);
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
