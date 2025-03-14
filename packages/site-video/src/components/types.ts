import { ReactNode } from 'react';

import { WithSupportProps } from '@sbercloud/uikit-product-utils';

export type VideoPlayerProps = {
  src: string;
  poster: string;
  controls?: boolean;
};

export type SiteVideoProps = WithSupportProps<{
  video: VideoPlayerProps | ReactNode;
  onPlay?(): void;
  className?: string;
}>;
