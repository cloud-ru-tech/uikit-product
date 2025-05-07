import { SyntheticEvent } from 'react';

import { SiteVideoProps, VideoPlayerProps } from './types';

export function preventDefault(e: SyntheticEvent) {
  e.preventDefault();
}

export function isVideoPlayerContent(video: SiteVideoProps['video']): video is VideoPlayerProps {
  return typeof video === 'object' && video !== null && video !== undefined && 'src' in video && 'poster' in video;
}
