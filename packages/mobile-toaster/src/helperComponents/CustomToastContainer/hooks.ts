// eslint-disable-next-line no-restricted-imports
import { useEffect, useLayoutEffect } from 'react';

export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
