import { useCallback, useRef } from 'react';

import { useLayoutEffect } from '@snack-uikit/utils';

import { warning } from '../utils';

export function useEventHandler<T extends (...args: never[]) => unknown>(handler: T) {
  const handlerRef = useRef<T | null>(null);

  useLayoutEffect(() => {
    handlerRef.current = handler;
  });

  return useCallback((...args: Parameters<T>) => {
    const handler = handlerRef.current;

    warning('The event handler cannot be called during render', handler === null);

    return handler?.(...args);
  }, []) as T;
}
