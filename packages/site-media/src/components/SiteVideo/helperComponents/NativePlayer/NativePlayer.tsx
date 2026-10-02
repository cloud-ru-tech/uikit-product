import 'video.js/dist/video-js.css';

import { KeyboardEvent, MouseEvent, PointerEvent, useCallback, useEffect, useRef, useState } from 'react';
import type Player from 'video.js/dist/types/player';

import { PlaySVG } from '@cloud-ru/uikit-product-icons';
import { useLocale } from '@cloud-ru/uikit-product-locale';
import { WithLayoutType } from '@cloud-ru/uikit-product-utils';
import { IconPredefined } from '@snack-uikit/icon-predefined';

import { DOUBLE_CLICK_DELAY, SEEK_STEP, TOOLBAR_HIDE_DELAY } from '../../constants';
import { useFullscreen } from '../../hooks/useFullscreen';
import { usePlayerState } from '../../hooks/usePlayerState';
import { useSpriteFrames } from '../../hooks/useSpriteFrames';
import { VideoPlayerProps } from '../../types';
import { getSourceType, preventDefault } from '../../utils';
import { PlayerError } from '../PlayerError';
import { Toolbar } from '../Toolbar';
import styles from './styles.module.scss';

type NativePlayerProps = WithLayoutType<
  Required<Pick<VideoPlayerProps, 'controls' | 'autoPlay' | 'muted' | 'loop'>> &
    Pick<VideoPlayerProps, 'src' | 'poster'> & {
      onFirstPlay?(): void;
      onError?(): void;
      'data-test-id': string;
    }
>;

export function NativePlayer({
  src,
  poster,
  controls,
  autoPlay,
  muted,
  loop,
  layoutType,
  onFirstPlay,
  onError,
  'data-test-id': dataTestId,
}: NativePlayerProps) {
  const { t } = useLocale('SiteMedia');

  const rootRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const pointerTypeRef = useRef('mouse');
  const onFirstPlayRef = useRef(onFirstPlay);
  onFirstPlayRef.current = onFirstPlay;
  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

  const [player, setPlayer] = useState<Player | null>(null);
  const [hasError, setHasError] = useState(false);
  const [hasStarted, setHasStarted] = useState(autoPlay);
  const [isPointerActive, setIsPointerActive] = useState(false);

  const state = usePlayerState(player);
  const frames = useSpriteFrames(src, controls);
  const { isFullscreen, toggleFullscreen } = useFullscreen(rootRef, player);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return;
    }

    let isDisposed = false;
    let instance: Player | undefined;

    setHasError(false);
    setHasStarted(autoPlay);

    import('video.js').then(({ default: videojs }) => {
      if (isDisposed) {
        return;
      }

      const element = document.createElement('video-js');
      mount.appendChild(element);

      instance = videojs(element, {
        sources: [{ src, type: getSourceType(src) }],
        poster,
        autoplay: autoPlay,
        muted: muted || autoPlay,
        loop,
        controls: false,
        preload: autoPlay ? 'auto' : 'metadata',
        playsinline: true,
        fill: true,
        bigPlayButton: false,
        controlBar: false,
        errorDisplay: false,
        textTrackSettings: false,
      });

      instance.on('error', () => {
        setHasError(true);
        onErrorRef.current?.();
      });
      instance.one('play', () => {
        setHasStarted(true);
        onFirstPlayRef.current?.();
      });

      setPlayer(instance);
    });

    return () => {
      isDisposed = true;
      instance?.dispose();
      setPlayer(null);
    };
  }, [src, poster, autoPlay, muted, loop]);

  useEffect(
    () => () => {
      clearTimeout(clickTimeoutRef.current);
      clearTimeout(hideTimeoutRef.current);
    },
    [],
  );

  const togglePlay = useCallback(() => {
    if (!player) {
      return;
    }

    if (player.paused()) {
      player.play()?.catch(() => undefined);
    } else {
      player.pause();
    }
  }, [player]);

  const isToolbarVisible = !state.isPlaying || isPointerActive;

  const showToolbar = () => {
    setIsPointerActive(true);
    clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(() => setIsPointerActive(false), TOOLBAR_HIDE_DELAY);
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (event.detail === 0) {
      togglePlay();
      return;
    }

    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = undefined;
      toggleFullscreen();
      return;
    }

    const shouldRevealToolbar = pointerTypeRef.current !== 'mouse' && !isToolbarVisible;

    clickTimeoutRef.current = setTimeout(() => {
      clickTimeoutRef.current = undefined;

      if (shouldRevealToolbar) {
        showToolbar();
      } else {
        togglePlay();
      }
    }, DOUBLE_CLICK_DELAY);
  };

  const handlePointerActivity = (event: PointerEvent<HTMLDivElement>) => {
    pointerTypeRef.current = event.pointerType;

    if (event.pointerType === 'mouse' || isToolbarVisible) {
      showToolbar();
    }
  };

  const handlePointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse') {
      setIsPointerActive(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (!player) {
      return;
    }

    switch (event.code) {
      case 'KeyK':
        togglePlay();
        break;
      case 'ArrowLeft':
        player.currentTime(Math.max(0, (player.currentTime() ?? 0) - SEEK_STEP));
        break;
      case 'ArrowRight':
        player.currentTime((player.currentTime() ?? 0) + SEEK_STEP);
        break;
      case 'KeyM':
        player.muted(!player.muted());
        break;
      case 'KeyF':
        toggleFullscreen();
        break;
      default:
        return;
    }

    event.preventDefault();
  };

  if (hasError) {
    return <PlayerError layoutType={layoutType} data-test-id={`${dataTestId}__error`} />;
  }

  const mountStyle = poster ? { backgroundImage: `url(${poster})` } : undefined;

  if (!controls) {
    return (
      <div className={styles.root} data-test-id={`${dataTestId}__video`}>
        <div ref={mountRef} className={styles.mount} style={mountStyle} />
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      className={styles.root}
      role='region'
      aria-label={t('Video.player')}
      data-test-id={`${dataTestId}__video`}
      onPointerDown={handlePointerActivity}
      onPointerMove={handlePointerActivity}
      onPointerLeave={handlePointerLeave}
      onContextMenu={preventDefault}
    >
      <div ref={mountRef} className={styles.mount} style={mountStyle} />

      <button
        type='button'
        className={styles.surface}
        aria-label={state.isPlaying ? t('Video.pause') : t('Video.play')}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      />

      {!hasStarted && (
        <button type='button' className={styles.overlay} aria-label={t('Video.play')} onClick={togglePlay}>
          <IconPredefined
            size={layoutType === 'mobile' ? 'm' : 'l'}
            shape='square'
            appearance='neutral'
            icon={PlaySVG}
            data-test-id={`${dataTestId}__play-button`}
          />
        </button>
      )}

      {player && hasStarted && (
        <Toolbar
          player={player}
          state={state}
          frames={frames}
          isVisible={isToolbarVisible}
          isFullscreen={isFullscreen}
          layoutType={layoutType}
          onTogglePlay={togglePlay}
          onToggleFullscreen={toggleFullscreen}
        />
      )}
    </div>
  );
}
