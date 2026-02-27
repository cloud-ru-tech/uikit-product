import { valid } from 'chroma-js';
import { useEffect, useMemo } from 'react';

import { BASE_PALETTE, PRIMARY_BRAND_COLOR_KEY } from '../constants/brandTools';
import { apcaContrast, generatePalette, generateThemeStyles } from '../utils/brandTools';

type UseApplyCustomThemeProps = {
  color?: string;
  themeMode?: 'light' | 'dark';
  enabled?: boolean;
  selectorId?: string;
  nonce?: string;
  applySelector?: string;
};

export function useApplyCustomTheme({
  enabled = false,
  color: colorProp,
  themeMode,
  selectorId = 'user-theme-style-elem',
  nonce,
  applySelector = 'body',
}: UseApplyCustomThemeProps) {
  const color = colorProp || BASE_PALETTE[PRIMARY_BRAND_COLOR_KEY];

  const generatedThemeStyles = useMemo(() => {
    const invert = valid(color) && apcaContrast(color, 'white') < 50;
    const palette = generatePalette(color);

    const themeStyles = generateThemeStyles(palette, invert);

    return themeStyles[themeMode || 'light'];
  }, [color, themeMode]);

  useEffect(() => {
    if (enabled) {
      const body = document.body;

      let userThemeStyleElem = document.querySelector(`#${selectorId}`);

      if (!userThemeStyleElem) {
        userThemeStyleElem = document.createElement('style');
        userThemeStyleElem.id = selectorId;

        if (nonce) {
          userThemeStyleElem.setAttribute('nonce', nonce);
        }
        body.appendChild(userThemeStyleElem);
      }

      const styleStr = Object.keys(generatedThemeStyles)
        .map(key => `${key}:${generatedThemeStyles[key]} !important`)
        .join(';');

      userThemeStyleElem.innerHTML = `${applySelector} {${styleStr}; \ncolor: var(--sys-neutral-text-main);}`;

      return () => {
        userThemeStyleElem?.parentNode && document.body.removeChild(userThemeStyleElem);
      };
    }
  }, [generatedThemeStyles, enabled, selectorId, nonce, applySelector]);
}
