import { SectionColor } from '../../../src/types';
import styles from './styles.module.scss';

export type CardClientProps = {
  img: string;
  alt: string;
  backgroundColor?: SectionColor;
};

export function CardClient({ img, alt, backgroundColor = 'neutral-background' }: CardClientProps) {
  return (
    <div className={styles.cardClient}>
      <div className={styles.imageBackground} data-background={backgroundColor} />
      <img className={styles.image} src={img} alt={alt} />
    </div>
  );
}
