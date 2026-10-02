import { PointerEvent, useState } from 'react';
import type Player from 'video.js/dist/types/player';

import {
  PauseInterfaceSVG,
  PlayInterfaceSVG,
  RepeatSVG,
  RewindAheadSVG,
  RewindSVG,
  RollupSVG,
  SoundOffSVG,
  SoundOnSVG,
  UnwrapSVG,
} from '@cloud-ru/uikit-product-icons';
import { useLocale } from '@cloud-ru/uikit-product-locale';
import { WithLayoutType } from '@cloud-ru/uikit-product-utils';
import { ButtonSimple } from '@snack-uikit/button';
import { Skeleton } from '@snack-uikit/skeleton';
import { Slider } from '@snack-uikit/slider';
import { Tooltip } from '@snack-uikit/tooltip';
import { Typography } from '@snack-uikit/typography';

import { SEEK_STEP } from '../../constants';
import { PlayerState } from '../../hooks/usePlayerState';
import { SpriteFrame } from '../../types';
import { findSpriteFrame, formatTime } from '../../utils';
import { SpeedSelect } from '../SpeedSelect';
import styles from './styles.module.scss';

const TIP_MIN_WIDTH = 64;

type ToolbarProps = WithLayoutType<{
  player: Player;
  state: PlayerState;
  frames: SpriteFrame[];
  isVisible: boolean;
  isFullscreen: boolean;
  onTogglePlay(): void;
  onToggleFullscreen(): void;
}>;

export function Toolbar({
  player,
  state,
  frames,
  isVisible,
  isFullscreen,
  layoutType,
  onTogglePlay,
  onToggleFullscreen,
}: ToolbarProps) {
  const { t } = useLocale('SiteMedia');
  const { isPlaying, isMuted, volume, currentTime, duration, buffered, rate } = state;

  const [hover, setHover] = useState<{ time: number; offset: number; width: number } | null>(null);

  const isCompact = layoutType === 'mobile';

  const getTimeByPointer = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));

    return { time: ratio * duration, offset: ratio * rect.width, width: rect.width };
  };

  const handleTimelinePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    player.currentTime(getTimeByPointer(event).time);
  };

  const handleTimelinePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const position = getTimeByPointer(event);
    setHover(position);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      player.currentTime(position.time);
    }
  };

  const handleVolumeChange = (value: number | number[]) => {
    if (typeof value === 'number') {
      player.volume(value / 100);
      player.muted(value === 0);
    }
  };

  const handleMute = () => {
    if (isMuted && volume === 0) {
      player.volume(1);
    }
    player.muted(!isMuted);
  };

  const handleRestart = () => {
    player.currentTime(0);
    player.play();
  };

  const renderTip = () => {
    if (!hover) {
      return null;
    }

    const frame = findSpriteFrame(frames, hover.time);
    const tipWidth = frame?.width ?? TIP_MIN_WIDTH;
    const left = Math.min(Math.max(hover.offset - tipWidth / 2, 0), hover.width - tipWidth);

    return (
      <div className={styles.tip} style={{ left, width: tipWidth }}>
        {frame && (
          <div
            className={styles.tipImage}
            style={{
              width: frame.width,
              height: frame.height,
              backgroundImage: `url(${frame.imageUrl})`,
              backgroundPosition: `-${frame.x}px -${frame.y}px`,
            }}
          />
        )}
        <Typography.SansLabelM className={styles.tipTime}>{formatTime(hover.time)}</Typography.SansLabelM>
      </div>
    );
  };

  const toolbarProps = {
    className: styles.root,
    'data-visible': isVisible,
    'data-layout-type': layoutType,
  };

  if (duration === 0) {
    return (
      <div {...toolbarProps}>
        <Skeleton width='100%' height={8} loading borderRadius={8} />
        <div className={styles.controls}>
          <Skeleton width={24} height={24} loading borderRadius={8} />
          <Skeleton width={128} height={24} loading borderRadius={8} />
          <div className={styles.spacer} />
          <Skeleton width={24} height={24} loading borderRadius={8} />
        </div>
      </div>
    );
  }

  const progress = (currentTime / duration) * 100;

  return (
    <div {...toolbarProps}>
      {renderTip()}
      <div
        className={styles.timeline}
        role='slider'
        tabIndex={-1}
        aria-label={t('Video.seek')}
        aria-valuemin={0}
        aria-valuemax={Math.round(duration)}
        aria-valuenow={Math.round(currentTime)}
        aria-valuetext={formatTime(currentTime)}
        onPointerDown={handleTimelinePointerDown}
        onPointerMove={handleTimelinePointerMove}
        onPointerLeave={() => setHover(null)}
      >
        <div className={styles.track}>
          {buffered.map(([start, end]) => (
            <div
              key={start}
              className={styles.buffered}
              style={{ left: `${(start / duration) * 100}%`, width: `${((end - start) / duration) * 100}%` }}
            />
          ))}
          <div className={styles.viewed} style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className={styles.controls}>
        <Tooltip tip={isPlaying ? t('Video.pause') : t('Video.play')} disableMaxWidth>
          <ButtonSimple
            size='xs'
            className={styles.button}
            icon={isPlaying ? <PauseInterfaceSVG /> : <PlayInterfaceSVG />}
            aria-label={isPlaying ? t('Video.pause') : t('Video.play')}
            onClick={onTogglePlay}
          />
        </Tooltip>

        <div className={styles.group}>
          <Tooltip tip={isMuted ? t('Video.unmute') : t('Video.mute')} disableMaxWidth>
            <ButtonSimple
              size='xs'
              className={styles.button}
              icon={isMuted ? <SoundOffSVG /> : <SoundOnSVG />}
              aria-label={isMuted ? t('Video.unmute') : t('Video.mute')}
              onClick={handleMute}
            />
          </Tooltip>
          {!isCompact && (
            <div className={styles.volume}>
              <Slider value={isMuted ? 0 : volume} min={0} max={100} step={1} onChange={handleVolumeChange} />
            </div>
          )}
        </div>

        <div className={styles.group}>
          {!isCompact && (
            <Tooltip tip={t('Video.rewind')} disableMaxWidth>
              <ButtonSimple
                size='xs'
                className={styles.button}
                icon={<RewindSVG />}
                aria-label={t('Video.rewind')}
                onClick={() => player.currentTime(Math.max(0, currentTime - SEEK_STEP))}
              />
            </Tooltip>
          )}
          <Typography.SansLabelM className={styles.time}>
            <span className={styles.currentTime}>{formatTime(currentTime)}</span>
            {` / ${formatTime(duration)}`}
          </Typography.SansLabelM>
          {!isCompact && (
            <Tooltip tip={t('Video.forward')} disableMaxWidth>
              <ButtonSimple
                size='xs'
                className={styles.button}
                icon={<RewindAheadSVG />}
                aria-label={t('Video.forward')}
                onClick={() => player.currentTime(Math.min(duration, currentTime + SEEK_STEP))}
              />
            </Tooltip>
          )}
        </div>

        {!isCompact && (
          <Tooltip tip={t('Video.restart')} disableMaxWidth>
            <ButtonSimple
              size='xs'
              className={styles.button}
              icon={<RepeatSVG />}
              aria-label={t('Video.restart')}
              onClick={handleRestart}
            />
          </Tooltip>
        )}

        <div className={styles.spacer} />

        <SpeedSelect player={player} rate={rate} layoutType={layoutType} />

        <Tooltip tip={isFullscreen ? t('Video.exitFullscreen') : t('Video.enterFullscreen')} disableMaxWidth>
          <ButtonSimple
            size='xs'
            className={styles.button}
            icon={isFullscreen ? <RollupSVG /> : <UnwrapSVG />}
            aria-label={isFullscreen ? t('Video.exitFullscreen') : t('Video.enterFullscreen')}
            onClick={onToggleFullscreen}
          />
        </Tooltip>
      </div>
    </div>
  );
}
