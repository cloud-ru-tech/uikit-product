import { MouseEvent, MouseEventHandler, useCallback } from 'react';

import { FooterClickPayload, FooterHandlers } from './types';

export function useFooterClick({ onElementClick, onNavigate }: FooterHandlers) {
  return useCallback(
    (payload: FooterClickPayload, event: MouseEvent<HTMLElement>, onClick?: MouseEventHandler<HTMLElement>) => {
      onClick?.(event);
      onElementClick?.(payload);

      if (payload.url) {
        onNavigate?.(payload.url, event);
      }
    },
    [onElementClick, onNavigate],
  );
}
