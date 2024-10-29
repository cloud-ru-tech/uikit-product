import { RefObject } from 'react';

import { Markdown } from '@snack-uikit/markdown';
import { Scroll } from '@snack-uikit/scroll';
import { Typography } from '@snack-uikit/typography';

import { NoteItemProps } from '../NoteItem';
import styles from './styles.module.scss';

type NoteItemMobileProps = NoteItemProps & {
  index: number;
  childrenScrollRefs: RefObject<HTMLElement[]>;
  onScrollRefInitialized(): void;
};

export function NoteItemMobile({
  title,
  description,
  image,
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
          <img src={image.src} alt={image.alt} className={styles.noteItemIllustration} />
          <Typography.SansTitleL>{title}</Typography.SansTitleL>
          <Markdown value={description} className={styles.noteItemMarkdownViewer} />
        </div>
      </Scroll>
    </div>
  );
}
