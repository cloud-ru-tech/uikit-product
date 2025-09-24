import { Typography } from '@snack-uikit/typography';

import styles from './styles.module.scss';

const IMG_ALT = 'Blog image';

export type ImageArticleProps = {
  image: {
    src: string;
    alt?: string;
  };
  description?: string;
};

export function ImageArticle(props: ImageArticleProps) {
  const { image, description } = props;

  return (
    <div className={styles.imageArticle} data-test-id='image-article'>
      <img src={image.src} alt={image.alt || IMG_ALT} />
      <Typography.SansBodyL className={styles.description}>{description}</Typography.SansBodyL>
    </div>
  );
}
