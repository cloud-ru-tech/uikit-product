import cn from 'classnames';
import { isValidElement, useCallback, useRef, useState } from 'react';

import { PlaySVG } from '@sbercloud/uikit-product-icons';
import { extractSupportProps } from '@sbercloud/uikit-product-utils';
import { ButtonElevated } from '@snack-uikit/button';

import styles from './styles.module.scss';
import { SiteVideoProps } from './types';
import { isVideoPlayerContent, preventDefault } from './utils';

export function SiteVideo({
  video,
  onPlay,
  'data-test-id': dataTestId = 'site-video',
  className,
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
            autoPlay={false}
            playsInline
            onContextMenu={preventDefault}
          />

          {!isVideoPlayed && video.controls && (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions
            <div className={styles.videoOverlay} onClick={handleVideoPlay}>
              <ButtonElevated size='m' icon={<PlaySVG />} data-test-id={`${dataTestId}__play-button`} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
