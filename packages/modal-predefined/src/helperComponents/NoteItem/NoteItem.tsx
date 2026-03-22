import { useEffect, useState } from 'react';

import { Markdown } from '@cloud-ru/uikit-product-markdown';
import { Scroll } from '@snack-uikit/scroll';
import { Skeleton } from '@snack-uikit/skeleton';
import { Typography } from '@snack-uikit/typography';

import styles from './styles.module.scss';

export type NoteItemProps = {
  /** Заголовок новости */
  title: string;
  /** Описание новости */
  description: string;
  /** Иллюстрация (изображение) */
  image: { src: string; alt: string };
  /** URL видео (при наличии показывается вместо статичного изображения) */
  video?: string;
};

function NoteItemMedia({ image, video }: Pick<NoteItemProps, 'image' | 'video'>) {
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
              <Skeleton width={380} height={380} borderRadius={8} loading />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export function NoteItem({ title, description, image, video }: NoteItemProps) {
  return (
    <div className={styles.noteItemWrapper}>
      <Scroll size='s' barHideStrategy='never'>
        <div className={styles.noteItemText}>
          <Typography.SansTitleL>{title}</Typography.SansTitleL>
          <Markdown value={description} className={styles.noteItemMarkdownViewer} />
        </div>
      </Scroll>
      <NoteItemMedia image={image} video={video} />
    </div>
  );
}
