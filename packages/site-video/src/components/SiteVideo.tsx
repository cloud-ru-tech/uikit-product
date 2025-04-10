import cn from 'classnames';
import { isValidElement, useCallback, useRef, useState } from 'react';

import { PlaySVG } from '@sbercloud/uikit-product-icons';
import { extractSupportProps } from '@sbercloud/uikit-product-utils';
import { IconPredefined } from '@snack-uikit/icon-predefined';

import styles from './styles.module.scss';
import { SiteVideoProps } from './types';
import { isVideoPlayerContent, preventDefault } from './utils';

export function SiteVideo({
  video,
  onPlay,
  onError,
  'data-test-id': dataTestId = 'site-video',
  className,
  layoutType,
  ...rest
}: SiteVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlayed, setIsVideoPlayed] = useState(false);

  const handleVideoPlay = useCallback(() => {
    setIsVideoPlayed(true);
    videoRef.current?.play();
    onPlay?.();
  }, [onPlay]);

  const isCustomVideoPlayer = isValidElement(video);

  return (
    <div className={cn(styles.videoWrapper, className)} data-test-id={dataTestId} {...extractSupportProps(rest)}>
      {isCustomVideoPlayer && video}

      {isVideoPlayerContent(video) && (
        <>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            src={video.src}
            poster={video.poster}
            ref={videoRef}
            data-test-id={`${dataTestId}__video`}
            preload='auto'
            disablePictureInPicture
            controlsList='nodownload noplaybackrate'
            controls={isVideoPlayed && video.controls}
            autoPlay={video.autoPlay}
            playsInline
            onContextMenu={preventDefault}
            muted={video.muted || video.autoPlay}
            loop={video.loop}
            onError={onError}
          />

          {!isVideoPlayed && video.controls && (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions
            <div className={styles.videoOverlay} onClick={handleVideoPlay}>
              <IconPredefined
                size={layoutType === 'mobile' ? 'm' : 'l'}
                shape='square'
                appearance='neutral'
                icon={PlaySVG}
                className={styles.playButton}
                data-test-id={`${dataTestId}__play-button`}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
