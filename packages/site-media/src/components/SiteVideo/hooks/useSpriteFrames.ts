import { useEffect, useState } from 'react';

import { SPRITE_VTT_NAME } from '../constants';
import { SpriteFrame } from '../types';
import { isHlsLink, parseSpriteVtt, resolveUrl } from '../utils';

export function useSpriteFrames(link: string, enabled: boolean) {
  const [frames, setFrames] = useState<SpriteFrame[]>([]);

  useEffect(() => {
    setFrames([]);

    const vttUrl = enabled && isHlsLink(link) ? resolveUrl(SPRITE_VTT_NAME, link) : undefined;
    if (!vttUrl) {
      return;
    }

    const controller = new AbortController();

    fetch(vttUrl, { signal: controller.signal })
      .then(response => (response.ok ? response.text() : ''))
      .then(vtt => setFrames(parseSpriteVtt(vtt, vttUrl)))
      .catch(() => setFrames([]));

    return () => controller.abort();
  }, [link, enabled]);

  return frames;
}
