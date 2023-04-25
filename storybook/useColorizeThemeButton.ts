import { useEffect, useLayoutEffect } from 'react';

import { Themes } from '@sbercloud/uikit-product-theme';

export const COLOR_MAP = {
  [Themes.Purple]: '#aaabfd',
  [Themes.PurpleDark]: '#5558fa',
  [Themes.Green]: '#07E897',
  [Themes.GreenDark]: '#157552',
};

export const useColorizeThemeButton = (theme: Themes) => {
  const colorizeThemeButton = () => {
    const themeIcon = window.parent.document.querySelector('button[title="Changing themes"]')?.querySelector('svg');
    if (!themeIcon) {
      setTimeout(() => colorizeThemeButton(), 200);
      return;
    }

    themeIcon.style.background = COLOR_MAP[theme];
    themeIcon.style['border-radius'] = '100%';
    themeIcon.style.color = 'rgb(0 0 0 / 10%)';
  };
  useLayoutEffect(() => {
    colorizeThemeButton();
  }, [theme]);

  useEffect(() => {
    colorizeThemeButton();
  }, []);
};
