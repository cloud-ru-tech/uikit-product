import { WithLayoutType } from '@cloud-ru/uikit-product-utils';

import { ArticleTypography } from '../ArticleTypography';
import styles from './styles.module.scss';

export type ArticleRichTextProps = WithLayoutType<{
  richText: string;
}>;

export function ArticleRichText(props: ArticleRichTextProps) {
  const { layoutType, richText } = props;

  return (
    <ArticleTypography layoutType={layoutType} tag='div' type='body'>
      <div className={styles.richText} dangerouslySetInnerHTML={{ __html: richText }} />
    </ArticleTypography>
  );
}
