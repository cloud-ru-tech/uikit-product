import { WithLayoutType } from '@sbercloud/uikit-product-utils';

import { ArticleRichText } from '../ArticleRichText';
import styles from './styles.module.scss';

export type HighlightProps = WithLayoutType<{
  richText: string;
}>;

export function Highlight(props: HighlightProps) {
  const { layoutType, richText } = props;

  return (
    <div className={styles.highlight} data-test-id='highlight'>
      <ArticleRichText layoutType={layoutType} richText={richText} />
    </div>
  );
}
