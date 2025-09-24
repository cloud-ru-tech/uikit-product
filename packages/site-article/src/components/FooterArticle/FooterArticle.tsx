import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { Typography } from '@snack-uikit/typography';

import { DropdownShare, DropdownShareOption } from '../DropdownShare';
import styles from './styles.module.scss';

export type FooterArticleProps = WithLayoutType<{
  releaseDate: string;
  dropdownOptions: DropdownShareOption[];
}>;

export function FooterArticle(props: FooterArticleProps) {
  const { layoutType, releaseDate, dropdownOptions } = props;

  const isMobile = layoutType === 'mobile';

  return (
    <div className={styles.footerArticle} data-test-id='footer-article'>
      <Typography.SansBodyL className={styles.releaseDate}>{releaseDate}</Typography.SansBodyL>
      <DropdownShare hideLabel={isMobile} options={dropdownOptions} />
    </div>
  );
}
