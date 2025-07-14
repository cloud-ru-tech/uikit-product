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

export const LAYOUT_TYPE = {
  Mobile: 'mobile',
  Tablet: 'tablet',
  Desktop: 'desktop',
  DesktopSmall: 'desktopSmall',
} as const;

export enum AdaptiveQueriesTitle {
  IsMobile = 'isMobile',
  IsTablet = 'isTablet',
  IsSmallDesktop = 'isSmallDesktop',
  IsDesktop = 'isDesktop',
  IsLarge = 'isLarge',
}

export const ADAPTIVE_QUERIES: Record<AdaptiveQueriesTitle, string> = {
  [AdaptiveQueriesTitle.IsMobile]: CSS_BREAKPOINTS.mobile,
  [AdaptiveQueriesTitle.IsTablet]: CSS_BREAKPOINTS.tablet,
  [AdaptiveQueriesTitle.IsSmallDesktop]: CSS_BREAKPOINTS.smallDesktop,
  [AdaptiveQueriesTitle.IsDesktop]: CSS_BREAKPOINTS.desktop,
  [AdaptiveQueriesTitle.IsLarge]: CSS_BREAKPOINTS.large,
};

export const INITIAL_ADAPTIVE_QUERIES_VALUE = {
  [AdaptiveQueriesTitle.IsMobile]: false,
  [AdaptiveQueriesTitle.IsTablet]: false,
  [AdaptiveQueriesTitle.IsSmallDesktop]: false,
  [AdaptiveQueriesTitle.IsDesktop]: false,
  [AdaptiveQueriesTitle.IsLarge]: false,
};
