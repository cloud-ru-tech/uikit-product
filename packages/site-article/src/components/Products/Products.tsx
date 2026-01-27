import { MouseEvent } from 'react';

import { WithLayoutType } from '@cloud-ru/uikit-product-utils';
import { Typography } from '@snack-uikit/typography';

import { ServiceLight } from './helperComponents';
import styles from './styles.module.scss';

export type ArticleProduct = {
  name: string;
  icon: string;
  href: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
};

export type ProductsProps = WithLayoutType<{
  products?: ArticleProduct[];
  solutions?: ArticleProduct[];
}>;

export function Products(props: ProductsProps) {
  const { layoutType, products, solutions } = props;

  return (
    <div className={styles.products} data-layout-type={layoutType}>
      {products?.length && products.length > 0 && (
        <div>
          <Typography.SansTitleM className={styles.label} tag='span'>
            Подключенные сервисы:
          </Typography.SansTitleM>
          <div className={styles.tags} data-layout-type={layoutType} data-test-id='article-products'>
            {products.map(item => (
              <ServiceLight key={item.name} {...item} />
            ))}
          </div>
        </div>
      )}
      {solutions?.length && solutions.length > 0 && (
        <div>
          <Typography.SansTitleM className={styles.label} tag='span'>
            Решения:
          </Typography.SansTitleM>
          <div className={styles.tags} data-layout-type={layoutType} data-test-id='article-solutions'>
            {solutions.map(item => (
              <ServiceLight key={item.name} {...item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
