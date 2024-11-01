import { useCallback, useEffect, useState } from 'react';

import { isBrowser, useLayoutEffect } from '@snack-uikit/utils';

import { DEFAULT, POST_MESSAGE_KEY } from '../constants/environment';
import { tryParseJson } from '../helpers/tryParseJson';
import { LanguageCodeType } from '../types';
import { getCustomStore } from './private/getCustomStore';

type useLanguageProps = {
  onlyEnabledLanguage?: boolean;
};

export const useLanguage = (props?: useLanguageProps) => {
  const store = getCustomStore();
  const [languageCode, setLanguageCode] = useState<LanguageCodeType>(store.languageCode || DEFAULT.LANGUAGE);
  const onlyEnabledLanguage = props?.onlyEnabledLanguage;

  useEffect(() => {
    const receiveChangeLanguageDoneMessage = (event: MessageEvent) => {
      const eventData = tryParseJson(event.data);
      if (eventData.key !== POST_MESSAGE_KEY.changeLanguageDone) return;
      setLanguageCode(eventData.value);
    };
    window.addEventListener('message', receiveChangeLanguageDoneMessage, false);

    return () => window.removeEventListener('message', receiveChangeLanguageDoneMessage, false);
  }, []);

  useLayoutEffect(() => {
    if (!onlyEnabledLanguage) {
      return;
    }
    const miniCode = languageCode.split('-')[0];
    const enGroup = miniCode === 'en';
    const ruGroup = ['ru', 'be'].includes(miniCode);
    if (enGroup) {
      setLanguageCode(LanguageCodeType.enGB);
      return;
    }
    if (ruGroup) {
      setLanguageCode(LanguageCodeType.ruRU);
      return;
    }
    if (languageCode === LanguageCodeType.cimode) {
      setLanguageCode(LanguageCodeType.cimode);
      return;
    }
    setLanguageCode(LanguageCodeType.ruRU);
  }, [languageCode, onlyEnabledLanguage]);

  const changeLanguage = useCallback((languageCode: LanguageCodeType) => {
    if (isBrowser()) {
      window.postMessage(
        JSON.stringify({ key: POST_MESSAGE_KEY.changeLanguage, value: languageCode }),
        location.origin,
      );
    }
  }, []);

  return { languageCode, changeLanguage };
};
