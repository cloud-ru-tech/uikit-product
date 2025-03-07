import styles from './styles.module.scss';

export type CardClientProps = {
  img: string;
  alt: string;
};

export function CardClient({ img, alt }: CardClientProps) {
  return (
    <div className={styles.cardClient}>
      <div className={styles.imageBackground} />
      <img className={styles.image} src={img} alt={alt} />
    </div>
  );
}
