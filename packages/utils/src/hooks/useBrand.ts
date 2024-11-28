import { useCallback, useEffect, useState } from 'react';

import { isBrowser } from '@snack-uikit/utils';

import { DEFAULT, POST_MESSAGE_KEY } from '../constants/environment';
import { tryParseJson } from '../helpers/tryParseJson';
import { Brand } from '../types/theme';
import { getCustomStore } from './private/getCustomStore';

export const useBrand = () => {
  const store = getCustomStore();
  const [brand, setBrand] = useState(store.brand || DEFAULT.BRAND);

  useEffect(() => {
    const receiveChangeThemeDoneMessage = (event: MessageEvent) => {
      const eventData = tryParseJson(event.data);
      if (eventData.key !== POST_MESSAGE_KEY.changeBrandDone) return;
      setBrand(eventData.value);
    };
    window.addEventListener('message', receiveChangeThemeDoneMessage, false);

    return () => window.removeEventListener('message', receiveChangeThemeDoneMessage, false);
  }, []);

  const changeBrand = useCallback((brand: Brand) => {
    isBrowser() &&
      window.postMessage(JSON.stringify({ key: POST_MESSAGE_KEY.changeBrand, value: brand }), location.origin);
  }, []);

  return { brand, changeBrand };
};
