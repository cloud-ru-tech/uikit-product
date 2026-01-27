import { useBrand, useTheme } from '../../hooks';
import { Brand, Themes } from '../../types/theme';

type UseForThemeModeParams<L, D> = {
  light: L;
  dark: D;
};

const DARK_THEMES = [Themes.GreenDark, Themes.PurpleDark];
const DARK_BRANDS = [Brand.CloudDark, Brand.GitverseDark, Brand.SiteDark, Brand.GigaIdDark];

export function useForThemeMode<L, D>({ light, dark }: UseForThemeModeParams<L, D>): L | D {
  const { theme } = useTheme();
  const { brand } = useBrand();
  const isDarkTheme = DARK_THEMES.includes(theme) || DARK_BRANDS.includes(brand);

  return isDarkTheme ? dark : light;
}
