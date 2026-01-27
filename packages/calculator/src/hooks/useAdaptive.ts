import { LAYOUT_TYPE } from '@cloud-ru/uikit-product-utils';

import { useCalculatorContext } from '../contexts';

export function useAdaptive() {
  const { layoutType } = useCalculatorContext();

  const isMobile = layoutType === LAYOUT_TYPE.Mobile;
  const isTablet = layoutType === LAYOUT_TYPE.Tablet;
  const isDesktopSmall = layoutType === LAYOUT_TYPE.DesktopSmall;
  const isDesktop = layoutType === LAYOUT_TYPE.Desktop;

  return {
    layoutType,
    isMobile,
    isTablet,
    isDesktopSmall,
    isDesktop,
  };
}
