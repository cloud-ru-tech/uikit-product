import { Themes } from '../types/theme';
import { store } from '../helpers/store';
import { useState, useCallback, useEffect } from 'react';
import { DEFAULT, POSTMASSAGE_KEY } from '../constants';

export const useTheme = () => {
  const [theme, setTheme] = useState(store.theme || DEFAULT.THEME);

  useEffect(() => {
    const receiveChangeThemeDoneMessage = (event: MessageEvent<string>) => {
      const eventData = JSON.parse(event.data);
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
