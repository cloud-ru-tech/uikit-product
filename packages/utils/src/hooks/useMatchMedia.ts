import { useState } from 'react';

import { useLayoutEffect } from '@snack-uikit/utils';

import { MatchMedia } from '../types/adaptive';
import { getMatchMedia, MEDIA_QUERY_LIST } from '../utils';

export const useMatchMedia = (): MatchMedia => {
  const [value, setValue] = useState(getMatchMedia);

  useLayoutEffect(() => {
    const handler = () => setValue(getMatchMedia);

    MEDIA_QUERY_LIST.forEach(([, mql]) => mql.addEventListener('change', handler));

    return (): void => MEDIA_QUERY_LIST.forEach(([, mql]) => mql.removeEventListener('change', handler));
  }, []);

  return value;
};
