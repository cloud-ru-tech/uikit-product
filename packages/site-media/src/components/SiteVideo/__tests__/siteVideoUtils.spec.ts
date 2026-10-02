import { describe, expect, it } from 'vitest';

import { findSpriteFrame, formatTime, getEmbedSource, getSourceType, parseSpriteVtt } from '../utils';

const HLS_LINK = 'https://cdn.cloud.ru/video/abc/hls/master.m3u8';

describe('getEmbedSource', () => {
  it('detects youtube links', () => {
    expect(getEmbedSource('https://www.youtube.com/watch?v=dQw4w9WgXcQ')).toEqual({
      provider: 'youtube',
      src: 'https://www.youtube.com/embed/dQw4w9WgXcQ?enablejsapi=1&playsinline=1',
    });
    expect(getEmbedSource('https://youtu.be/dQw4w9WgXcQ')?.provider).toBe('youtube');
  });

  it('detects rutube links', () => {
    expect(getEmbedSource('https://rutube.ru/video/3f1c2a/')).toEqual({
      provider: 'rutube',
      src: 'https://rutube.ru/play/embed/3f1c2a',
    });
  });

  it('returns undefined for files', () => {
    expect(getEmbedSource('https://cdn.cloud.ru/video/abc.mp4')).toBeUndefined();
    expect(getEmbedSource(HLS_LINK)).toBeUndefined();
  });
});

describe('getSourceType', () => {
  it('picks HLS by extension', () => {
    expect(getSourceType(HLS_LINK)).toBe('application/x-mpegURL');
    expect(getSourceType(`${HLS_LINK}?v=2`)).toBe('application/x-mpegURL');
    expect(getSourceType('https://cdn.cloud.ru/video/abc.mp4')).toBe('video/mp4');
  });
});

describe('parseSpriteVtt', () => {
  const vttUrl = 'https://cdn.cloud.ru/video/abc/hls/player_sprite.vtt';
  const vtt = [
    'WEBVTT',
    '',
    '00:00:00.000 --> 00:00:05.000',
    'player_sprite.jpg#xywh=0,0,147,82',
    '',
    '00:00:05.000 --> 00:00:10.000',
    'player_sprite.jpg#xywh=147,0,147,82',
    '',
    '01:00:10.500 --> 01:00:15.000',
    'player_sprite.jpg#xywh=0,82,147,82',
  ].join('\n');

  it('parses frames and resolves image url relative to vtt', () => {
    const frames = parseSpriteVtt(vtt, vttUrl);

    expect(frames).toHaveLength(3);
    expect(frames[1]).toEqual({
      start: 5,
      imageUrl: 'https://cdn.cloud.ru/video/abc/hls/player_sprite.jpg',
      x: 147,
      y: 0,
      width: 147,
      height: 82,
    });
    expect(frames[2].start).toBe(3610.5);
  });

  it('finds the frame for a given time', () => {
    const frames = parseSpriteVtt(vtt, vttUrl);

    expect(findSpriteFrame(frames, 7)?.x).toBe(147);
    expect(findSpriteFrame(frames, 0)?.x).toBe(0);
    expect(findSpriteFrame([], 7)).toBeUndefined();
  });
});

describe('formatTime', () => {
  it('formats minutes and hours', () => {
    expect(formatTime(0)).toBe('0:00');
    expect(formatTime(65.7)).toBe('1:05');
    expect(formatTime(3725)).toBe('1:02:05');
  });
});
