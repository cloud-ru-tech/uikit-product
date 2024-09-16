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

const MEDIA_QUERIES = Object.entries(QUERIES).reduce(
  (acc, [key, q]) => ({ ...acc, [key]: globalThis.matchMedia(q) }),
  {},
) as Record<QueriesTitle, MediaQueryList>;

export const MEDIA_QUERY_LIST = Object.entries(MEDIA_QUERIES) as Array<[QueriesTitle, MediaQueryList]>;

export const getMatchMedia = (): MatchMedia =>
  MEDIA_QUERY_LIST.reduce((acc, [key, q]) => ({ ...acc, [key]: q.matches }), INITIAL_QUERIES_VALUE);
