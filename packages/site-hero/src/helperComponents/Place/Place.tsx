import { MouseEventHandler } from 'react';

import { Link } from '@snack-uikit/link';

import styles from './styles.module.scss';

export type PlaceProps = {
  title: string;
  href?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export function Place({ href, title, onClick }: PlaceProps) {
  return (
    <>
      {href ? (
        <Link
          href={href}
          onClick={onClick}
          className={styles.place}
          target='_blank'
          text={title}
          size='l'
          appearance='neutral'
          insideText
        />
      ) : (
        <span className={styles.place}>{title}</span>
      )}
    </>
  );
}
