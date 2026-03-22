import { RefObject, useEffect, useState } from 'react';

import { Markdown } from '@cloud-ru/uikit-product-markdown';
import { Scroll } from '@snack-uikit/scroll';
import { Skeleton } from '@snack-uikit/skeleton';
import { Typography } from '@snack-uikit/typography';

import { NoteItemProps } from '../NoteItem';
import styles from './styles.module.scss';

type NoteItemMobileProps = NoteItemProps & {
  index: number;
  childrenScrollRefs: RefObject<HTMLElement[]>;
  onScrollRefInitialized(): void;
};

function NoteItemMobileMedia({ image, video }: Pick<NoteItemProps, 'image' | 'video'>) {
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    if (!video) {
      return;
    }
    setVideoReady(false);
    setVideoError(false);
  }, [video]);

  if (!video) {
    return <img src={image.src} alt={image.alt} className={styles.noteItemIllustration} />;
  }

  return (
    <div className={styles.noteItemIllustrationSlot}>
      {videoError ? (
        <img src={image.src} alt={image.alt} className={styles.noteItemIllustration} />
      ) : (
        <>
          <video
            src={video}
            className={styles.noteItemVideo}
            muted
            loop
            playsInline
            autoPlay
            onLoadedData={() => setVideoReady(true)}
            onError={() => setVideoError(true)}
            aria-hidden
          />
          {!videoReady && (
            <div className={styles.noteItemMediaSkeletonOverlay}>
              <Skeleton width='100%' height='100%' borderRadius={8} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export function NoteItemMobile({
  title,
  description,
  image,
  video,
  childrenScrollRefs,
  index,
  onScrollRefInitialized,
}: NoteItemMobileProps) {
  return (
    <div className={styles.noteItemWrapper}>
      <Scroll
        size='m'
        barHideStrategy='never'
        ref={el => {
          if (childrenScrollRefs.current && el) {
            childrenScrollRefs.current[index] = el;
            onScrollRefInitialized();
          }
        }}
      >
        <div className={styles.noteItemContent}>
          <NoteItemMobileMedia image={image} video={video} />
          <Typography.SansTitleL>{title}</Typography.SansTitleL>
          <Markdown value={description} className={styles.noteItemMarkdownViewer} />
        </div>
      </Scroll>
    </div>
  );
}
