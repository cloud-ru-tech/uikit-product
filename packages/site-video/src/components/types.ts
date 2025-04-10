import { ReactEventHandler, ReactNode } from 'react';

import { WithLayoutType, WithSupportProps } from '@sbercloud/uikit-product-utils';

export type VideoPlayerProps = {
  src: string;
  poster: string;
  controls?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
};

export type SiteVideoProps = WithLayoutType<
  WithSupportProps<{
    video: VideoPlayerProps | ReactNode;
    onPlay?(): void;
    onError?: ReactEventHandler<HTMLVideoElement>;
    className?: string;
  }>
>;
