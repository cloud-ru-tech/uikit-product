import cn from 'classnames';
import { isValidElement, useMemo } from 'react';

import { extractSupportProps } from '@cloud-ru/uikit-product-utils';

import { EmbedPlayer } from './helperComponents/EmbedPlayer';
import { NativePlayer } from './helperComponents/NativePlayer';
import styles from './styles.module.scss';
import { SiteVideoProps } from './types';
import { getEmbedSource, isVideoPlayerContent } from './utils';

export function SiteVideo({
  video,
  onPlay,
  onError,
  'data-test-id': dataTestId = 'site-video',
  className,
  layoutType,
  ...rest
}: SiteVideoProps) {
  const playerContent = isVideoPlayerContent(video) ? video : undefined;
  const src = playerContent?.src;

  const embedSource = useMemo(() => (src ? getEmbedSource(src) : undefined), [src]);

  const renderPlayer = () => {
    if (!playerContent) {
      return null;
    }

    if (embedSource) {
      return <EmbedPlayer source={embedSource} onFirstPlay={onPlay} data-test-id={`${dataTestId}__embed`} />;
    }

    const { controls = false, autoPlay = false, muted = false, loop = false } = playerContent;

    return (
      <NativePlayer
        key={playerContent.src}
        src={playerContent.src}
        poster={playerContent.poster}
        controls={controls}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        layoutType={layoutType}
        onFirstPlay={onPlay}
        onError={onError}
        data-test-id={dataTestId}
      />
    );
  };

  return (
    <div className={cn(styles.videoWrapper, className)} data-test-id={dataTestId} {...extractSupportProps(rest)}>
      {isValidElement(video) && video}
      {renderPlayer()}
    </div>
  );
}
