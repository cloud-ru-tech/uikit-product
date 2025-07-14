import { useRef, useState } from 'react';

import { useLayoutEffect } from '@snack-uikit/utils';

import { ADAPTIVE_QUERIES, INITIAL_ADAPTIVE_QUERIES_VALUE } from '../constants/adaptive';
import { DISPLAY_MODE_QUERIES, INITIAL_DISPLAY_MODE_QUERIES_VALUE } from '../constants/displayMode';
import { MatchMediaGeneric } from '../types';
import { getMatchMediaGeneric, getMediaQueryListGeneric } from '../utils/getMatchMedia';

export const useMatchMediaGeneric = <T extends string>({
  queryValues,
  initialValues,
}: {
  queryValues: Record<T, string>;
  initialValues: MatchMediaGeneric<T>;
}): MatchMediaGeneric<T> => {
  const updatedHandlers = {
    getMatchMedia: () => getMatchMediaGeneric({ queryValues, initialValues }),
    getMediaQueryList: () => getMediaQueryListGeneric({ queryValues }),
  };

  const handlersRef = useRef(updatedHandlers);
  handlersRef.current = updatedHandlers;

  const [value, setValue] = useState(handlersRef.current.getMatchMedia);

  useLayoutEffect(() => {
    const handler = () => setValue(handlersRef.current.getMatchMedia);

    const mediaQueryList = handlersRef.current.getMediaQueryList();

    mediaQueryList.forEach(([, mql]) => mql.addEventListener('change', handler));

    return (): void => mediaQueryList.forEach(([, mql]) => mql.removeEventListener('change', handler));
  }, []);

  return value;
};

export function useAdaptiveMatchMedia() {
  return useMatchMediaGeneric({
    queryValues: ADAPTIVE_QUERIES,
    initialValues: INITIAL_ADAPTIVE_QUERIES_VALUE,
  });
}

export function useDisplayModeMatchMedia() {
  return useMatchMediaGeneric({
    queryValues: DISPLAY_MODE_QUERIES,
    initialValues: INITIAL_DISPLAY_MODE_QUERIES_VALUE,
  });
}
