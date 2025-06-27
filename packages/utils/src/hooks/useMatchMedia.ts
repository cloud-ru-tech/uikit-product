import { useState } from 'react';

import { useLayoutEffect } from '@snack-uikit/utils';

import { MatchMedia } from '../types/adaptive';
import { getMatchMedia, getMediaQueryList } from '../utils';

export const useMatchMedia = (): MatchMedia => {
  const [value, setValue] = useState(getMatchMedia);

  useLayoutEffect(() => {
    const handler = () => setValue(getMatchMedia);

    const mediaQueryList = getMediaQueryList();

    mediaQueryList.forEach(([, mql]) => mql.addEventListener('change', handler));

    return (): void => mediaQueryList.forEach(([, mql]) => mql.removeEventListener('change', handler));
  }, []);

  return value;
};
