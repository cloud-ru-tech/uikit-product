import { useCallback, useEffect, useLayoutEffect, useState } from 'react';

import { DEFAULT, POSTMASSAGE_KEY } from '../constants';
import { store } from '../helpers/store';
import { tryParseJson } from '../helpers/tryParseJson';
import { LanguageCodeType } from '../types';

interface useLanguageProps {
  onlyEnabledLanguage?: boolean;
}

export const useLanguage = (props?: useLanguageProps) => {
  const [code, setCode] = useState<LanguageCodeType>(store.languageCode || DEFAULT.LANGUAGE);
  const onlyEnabledLanguage = props?.onlyEnabledLanguage;

  useEffect(() => {
    const receiveChangeLanguageDoneMessage = (event: MessageEvent) => {
      const eventData = tryParseJson(event.data);
      if (eventData.key !== POSTMASSAGE_KEY.changeLanguageDone) return;
      setCode(eventData.value);
    };
    window.addEventListener('message', receiveChangeLanguageDoneMessage, false);

    return () => window.removeEventListener('message', receiveChangeLanguageDoneMessage, false);
  }, []);

  useLayoutEffect(() => {
    if (!onlyEnabledLanguage) {
      return;
    }
    const miniCode = code.split('-')[0];
    const enGroup = miniCode === 'en';
    const ruGroup = ['ru', 'be'].includes(miniCode);
    if (enGroup) {
      setCode(LanguageCodeType.enGB);
      return;
    }
    if (ruGroup) {
      setCode(LanguageCodeType.ruRU);
      return;
    }
    setCode(LanguageCodeType.ruRU);
  }, [code, onlyEnabledLanguage]);

  const changeLanguage = useCallback((languageCode: LanguageCodeType) => {
    window.postMessage(JSON.stringify({ key: POSTMASSAGE_KEY.changeLanguage, value: languageCode }), location.origin);
  }, []);

  return { code, changeLanguage };
};
