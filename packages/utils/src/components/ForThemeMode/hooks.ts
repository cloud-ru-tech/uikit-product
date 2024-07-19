import { Themes, useTheme } from '../../';

type UseForThemeModeParams<L, D> = {
  light: L;
  dark: D;
};

const DARK_THEMES = [Themes.GreenDark, Themes.PurpleDark];

export function useForThemeMode<L, D>({ light, dark }: UseForThemeModeParams<L, D>): L | D {
  const { theme } = useTheme();
  const isDarkTheme = DARK_THEMES.includes(theme);

  return isDarkTheme ? dark : light;
}
