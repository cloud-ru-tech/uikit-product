import { isBrowser } from '@snack-uikit/utils';

import { ADAPTIVE_QUERIES, INITIAL_ADAPTIVE_QUERIES_VALUE } from '../constants/adaptive';
import { DISPLAY_MODE_QUERIES, INITIAL_DISPLAY_MODE_QUERIES_VALUE } from '../constants/displayMode';
import { MatchMediaGeneric } from '../types';

function getMediaQueries<T extends string>({ queryValues }: { queryValues: Record<T, string> }) {
  return Object.keys(queryValues).reduce(
    (acc, key) => ({
      ...acc,
      [key]: isBrowser() ? globalThis.matchMedia(queryValues[key as T]) : undefined,
    }),
    {} as Record<T, MediaQueryList>,
  );
}

export function getMediaQueryListGeneric<T extends string>({ queryValues }: { queryValues: Record<T, string> }) {
  return Object.entries(getMediaQueries({ queryValues })) as Array<[T, MediaQueryList]>;
}

export function getMatchMediaGeneric<T extends string>({
  queryValues,
  initialValues,
}: {
  queryValues: Record<T, string>;
  initialValues: MatchMediaGeneric<T>;
}) {
  return getMediaQueryListGeneric<T>({ queryValues }).reduce(
    (acc, [key, q]) => ({ ...acc, [key]: q?.matches || false }),
    initialValues,
  );
}

export const getAdaptiveMatchMedia = () =>
  getMatchMediaGeneric({ queryValues: ADAPTIVE_QUERIES, initialValues: INITIAL_ADAPTIVE_QUERIES_VALUE });

export const getDisplayModeMatchMedia = () =>
  getMatchMediaGeneric({ queryValues: DISPLAY_MODE_QUERIES, initialValues: INITIAL_DISPLAY_MODE_QUERIES_VALUE });
