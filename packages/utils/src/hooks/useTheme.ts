import { useCallback, useEffect, useState } from 'react';

import { isBrowser } from '@snack-uikit/utils';

import { DEFAULT, POST_MESSAGE_KEY } from '../constants/environment';
import { tryParseJson } from '../helpers/tryParseJson';
import { Themes } from '../types/theme';
import { getCustomStore } from './private/getCustomStore';

export const useTheme = () => {
  const store = getCustomStore();
  const [theme, setTheme] = useState(store.theme || DEFAULT.THEME);

  useEffect(() => {
    const receiveChangeThemeDoneMessage = (event: MessageEvent) => {
      const eventData = tryParseJson(event.data);
      if (eventData.key !== POST_MESSAGE_KEY.changeThemeDone) return;
      setTheme(eventData.value);
    };
    window.addEventListener('message', receiveChangeThemeDoneMessage, false);

    return () => window.removeEventListener('message', receiveChangeThemeDoneMessage, false);
  }, []);

  const changeTheme = useCallback((theme: Themes) => {
    isBrowser() &&
      window.postMessage(JSON.stringify({ key: POST_MESSAGE_KEY.changeTheme, value: theme }), location.origin);
  }, []);

  return { theme, changeTheme };
};
