export const Adaptive = {
  mobile: 767,
  tablet: 1023,
  smallDesktop: 1279,
  desktop: 1439,
};

export const CSS_BREAKPOINTS = {
  mobile: `(max-width: ${Adaptive.mobile}px)`,
  tablet: `(max-width: ${Adaptive.tablet}px)`,
  smallDesktop: `(max-width: ${Adaptive.smallDesktop}px)`,
  desktop: `(max-width: ${Adaptive.desktop}px)`,
  large: `(min-width: ${Adaptive.desktop + 1}px)`,
};

export enum QueriesTitle {
  IsMobile = 'isMobile',
  IsTablet = 'isTablet',
  IsSmallDesktop = 'isSmallDesktop',
  IsDesktop = 'isDesktop',
  IsLarge = 'isLarge',
}

export const LAYOUT_TYPE = {
  Mobile: 'mobile',
  Tablet: 'tablet',
  Desktop: 'desktop',
  DesktopSmall: 'desktopSmall',
} as const;
