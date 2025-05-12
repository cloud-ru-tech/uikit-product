import cn from 'classnames';

import styles from './styles.module.scss';

export type ImageCoverProps = {
  className?: string;
  /** Ссылка на картинку */
  image: string;
  /** Альтернативное текстовое содержание */
  alt: string;
  /**
   * Является ли деактивированным
   * @default false
   */
  disabled?: boolean;
};

export function ImageCover(props: ImageCoverProps) {
  const { className, disabled, image, alt } = props;

  return (
    <div className={cn(styles.imageCoverContainer, className)} data-disabled={disabled || undefined}>
      <img className={cn(styles.imageCover)} src={image} alt={alt} />
    </div>
  );
}
