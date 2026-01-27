import { Markdown } from '@cloud-ru/uikit-product-markdown';
import { Scroll } from '@snack-uikit/scroll';
import { Typography } from '@snack-uikit/typography';

import styles from './styles.module.scss';

export type NoteItemProps = {
  /** Заголовок новости */
  title: string;
  /** Описание новости */
  description: string;
  /** Иллюстрация (изображение) */
  image: { src: string; alt: string };
};

export function NoteItem({ title, description, image }: NoteItemProps) {
  return (
    <div className={styles.noteItemWrapper}>
      <Scroll size='s' barHideStrategy='never'>
        <div className={styles.noteItemText}>
          <Typography.SansTitleL>{title}</Typography.SansTitleL>
          <Markdown value={description} className={styles.noteItemMarkdownViewer} />
        </div>
      </Scroll>
      <img src={image.src} alt={image.alt} className={styles.noteItemIllustration} />
    </div>
  );
}
