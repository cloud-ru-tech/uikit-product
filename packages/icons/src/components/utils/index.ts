import { useMemo } from 'react';
import { Themes, useTheme } from '@sbercloud/uikit-product-utils';

export function useThemeModification() {
  const { theme } = useTheme();
  const isDarkTheme = useMemo(() => [Themes.GreenDark, Themes.PurpleDark].includes(theme), [theme]);

  return { isDarkTheme };
}
