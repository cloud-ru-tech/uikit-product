import { RefObject, useCallback, useEffect, useState } from 'react';
import type Player from 'video.js/dist/types/player';

import { isBrowser } from '@snack-uikit/utils';

export function useFullscreen(rootRef: RefObject<HTMLElement>, player: Player | null) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const update = () => setIsFullscreen(Boolean(rootRef.current) && document.fullscreenElement === rootRef.current);

    document.addEventListener('fullscreenchange', update);

    return () => document.removeEventListener('fullscreenchange', update);
  }, [rootRef]);

  const toggleFullscreen = useCallback(() => {
    const root = rootRef.current;

    if (isBrowser() && document.fullscreenElement) {
      document.exitFullscreen();
      return;
    }

    if (root?.requestFullscreen) {
      root.requestFullscreen();
      return;
    }

    player?.requestFullscreen();
  }, [rootRef, player]);

  return { isFullscreen, toggleFullscreen };
}
