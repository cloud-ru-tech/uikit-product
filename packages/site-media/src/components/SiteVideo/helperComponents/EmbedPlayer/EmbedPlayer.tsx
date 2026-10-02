import { memo, useEffect, useRef } from 'react';

import { useLocale } from '@cloud-ru/uikit-product-locale';

import { EmbedSource } from '../../utils';

const YOUTUBE_PLAYING_STATE = 1;

type EmbedPlayerProps = {
  source: EmbedSource;
  onFirstPlay?(): void;
  'data-test-id': string;
};

function parseMessage(data: unknown) {
  if (typeof data !== 'string') {
    return undefined;
  }

  try {
    return JSON.parse(data);
  } catch {
    return undefined;
  }
}

function isPlayingMessage(provider: EmbedSource['provider'], data: unknown) {
  const message = parseMessage(data);

  if (provider === 'rutube') {
    return message?.type === 'player:changeState' && message.data?.state === 'playing';
  }

  return (
    (message?.event === 'onStateChange' && message.info === YOUTUBE_PLAYING_STATE) ||
    (message?.event === 'infoDelivery' && message.info?.playerState === YOUTUBE_PLAYING_STATE)
  );
}

export const EmbedPlayer = memo(function EmbedPlayer({
  source,
  onFirstPlay,
  'data-test-id': dataTestId,
}: EmbedPlayerProps) {
  const { t } = useLocale('SiteMedia');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const onFirstPlayRef = useRef(onFirstPlay);
  onFirstPlayRef.current = onFirstPlay;

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.source !== iframeRef.current?.contentWindow || !isPlayingMessage(source.provider, event.data)) {
        return;
      }

      onFirstPlayRef.current?.();
      window.removeEventListener('message', handleMessage);
    };

    window.addEventListener('message', handleMessage);

    return () => window.removeEventListener('message', handleMessage);
  }, [source]);

  const handleLoad = () => {
    if (source.provider === 'youtube') {
      iframeRef.current?.contentWindow?.postMessage(JSON.stringify({ event: 'listening' }), 'https://www.youtube.com');
    }
  };

  return (
    <iframe
      ref={iframeRef}
      title={t('Video.embedTitle')}
      src={source.src}
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
      allowFullScreen
      data-test-id={dataTestId}
      onLoad={handleLoad}
    />
  );
});
