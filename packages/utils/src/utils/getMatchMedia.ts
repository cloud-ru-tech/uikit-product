import { isBrowser } from '@snack-uikit/utils';

import { CSS_BREAKPOINTS, QueriesTitle } from '../constants/adaptive';
import { MatchMedia } from '../types';

const QUERIES: Record<QueriesTitle, string> = {
  [QueriesTitle.IsMobile]: CSS_BREAKPOINTS.mobile,
  [QueriesTitle.IsTablet]: CSS_BREAKPOINTS.tablet,
  [QueriesTitle.IsSmallDesktop]: CSS_BREAKPOINTS.smallDesktop,
  [QueriesTitle.IsDesktop]: CSS_BREAKPOINTS.desktop,
  [QueriesTitle.IsLarge]: CSS_BREAKPOINTS.large,
};

const INITIAL_QUERIES_VALUE = {
  [QueriesTitle.IsMobile]: false,
  [QueriesTitle.IsTablet]: false,
  [QueriesTitle.IsSmallDesktop]: false,
  [QueriesTitle.IsDesktop]: false,
  [QueriesTitle.IsLarge]: false,
};

const getMediaQueries = () =>
  Object.values(QueriesTitle).reduce(
    (acc, key) => ({ ...acc, [key]: isBrowser() ? globalThis.matchMedia(QUERIES[key]) : undefined }),
    {} as Record<QueriesTitle, MediaQueryList>,
  );

let mediaQueryListCache: Array<[QueriesTitle, MediaQueryList]>;
export const getMediaQueryList = () => {
  if (!mediaQueryListCache) {
    mediaQueryListCache = Object.entries(getMediaQueries()) as Array<[QueriesTitle, MediaQueryList]>;
  }

  return mediaQueryListCache;
};

export const getMatchMedia = (): MatchMedia =>
  getMediaQueryList().reduce((acc, [key, q]) => ({ ...acc, [key]: q?.matches || false }), INITIAL_QUERIES_VALUE);
