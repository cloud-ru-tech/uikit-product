import { SyntheticEvent } from 'react';

import { isBrowser } from '@snack-uikit/utils';

import { SiteVideoProps, SpriteFrame, VideoPlayerProps } from './types';

const YOUTUBE_ID_REGEXP = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/i;
const RUTUBE_ID_REGEXP = /rutube\.ru\/(?:video\/|play\/embed\/)(\w+)/;
const HLS_REGEXP = /\.m3u8(?:$|[?#])/i;

const VTT_TIMES_REGEXP = /(\d+):(\d+):(\d+)[.,](\d+)\s+-->/;
const VTT_XYWH_REGEXP = /^(.+)#xywh=(\d+),(\d+),(\d+),(\d+)$/;

export type EmbedSource = {
  provider: 'youtube' | 'rutube';
  src: string;
};

export function getEmbedSource(link: string): EmbedSource | undefined {
  const youtubeId = link.match(YOUTUBE_ID_REGEXP)?.[1];
  if (youtubeId) {
    return { provider: 'youtube', src: `https://www.youtube.com/embed/${youtubeId}?enablejsapi=1&playsinline=1` };
  }

  const rutubeId = link.match(RUTUBE_ID_REGEXP)?.[1];
  if (rutubeId) {
    return { provider: 'rutube', src: `https://rutube.ru/play/embed/${rutubeId}` };
  }

  return undefined;
}

export function isHlsLink(link: string) {
  return HLS_REGEXP.test(link);
}

export function getSourceType(link: string) {
  return isHlsLink(link) ? 'application/x-mpegURL' : 'video/mp4';
}

export function resolveUrl(path: string, base: string) {
  if (isBrowser()) {
    try {
      return new URL(path, new URL(base, window.location.href)).href;
    } catch {
      return undefined;
    }
  }

  return undefined;
}

export function parseSpriteVtt(vtt: string, vttUrl: string): SpriteFrame[] {
  const lines = vtt.split(/\r?\n/).map(line => line.trim());

  return lines.reduce<SpriteFrame[]>((frames, line, index) => {
    const time = line.match(VTT_TIMES_REGEXP);
    const xywh = lines[index + 1]?.match(VTT_XYWH_REGEXP);

    if (!time || !xywh) {
      return frames;
    }

    const [, hours, minutes, seconds, fraction] = time;
    const [, image, x, y, width, height] = xywh;
    const imageUrl = resolveUrl(image, vttUrl);

    if (imageUrl) {
      frames.push({
        start: Number(hours) * 3600 + Number(minutes) * 60 + Number(`${seconds}.${fraction}`),
        imageUrl,
        x: Number(x),
        y: Number(y),
        width: Number(width),
        height: Number(height),
      });
    }

    return frames;
  }, []);
}

export function findSpriteFrame(frames: SpriteFrame[], time: number) {
  let result: SpriteFrame | undefined;

  for (const frame of frames) {
    if (frame.start > time) {
      break;
    }
    result = frame;
  }

  return result;
}

export function formatTime(totalSeconds: number) {
  const seconds = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const restSeconds = String(seconds % 60).padStart(2, '0');

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${restSeconds}`;
  }

  return `${minutes}:${restSeconds}`;
}

export function formatRate(rate: number) {
  return `${String(rate).replace('.', ',')}x`;
}

export function preventDefault(e: SyntheticEvent) {
  e.preventDefault();
}

export function isVideoPlayerContent(video: SiteVideoProps['video']): video is VideoPlayerProps {
  return typeof video === 'object' && video !== null && video !== undefined && 'src' in video && 'poster' in video;
}
