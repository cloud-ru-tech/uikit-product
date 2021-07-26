import { useCallback, useEffect, useState } from 'react';

import { DEFAULT, POSTMASSAGE_KEY } from '../constants';
import { store } from '../helpers/store';
import { tryParseJson } from '../helpers/tryParseJson';
import { Themes } from '../types/theme';

export const useTheme = () => {
  const [theme, setTheme] = useState(store.theme || DEFAULT.THEME);

  useEffect(() => {
    const receiveChangeThemeDoneMessage = (event: MessageEvent) => {
      const eventData = tryParseJson(event.data);
      if (eventData.key !== POSTMASSAGE_KEY.changeThemeDone) return;
      setTheme(eventData.value);
    };
    window.addEventListener('message', receiveChangeThemeDoneMessage, false);

    return () => window.removeEventListener('message', receiveChangeThemeDoneMessage, false);
  }, []);

  const changeTheme = useCallback((theme: Themes) => {
    window.postMessage(JSON.stringify({ key: POSTMASSAGE_KEY.changeTheme, value: theme }), location.origin);
  }, []);

  return { theme, changeTheme, Themes };
};
