import { useMemo } from 'react';
import { Brand, Themes, useTheme, useBrand } from '@sbercloud/uikit-product-utils';

export function useThemeModification() {
  const { theme } = useTheme();
  const isDarkTheme = useMemo(() => [Themes.GreenDark].includes(theme), [theme]);

  return { isDarkTheme };
}

export function useBrandModification() {
  const { brand } = useBrand();
  const isDarkBrand = useMemo(() => [Brand.CloudDark, Brand.SiteDark, Brand.GigaIdDark].includes(brand), [brand]);

  return { isDarkBrand };
}
