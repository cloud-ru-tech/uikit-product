import { DecorCheckedSVG } from '@sbercloud/uikit-product-icons';
import { RichText } from '@sbercloud/uikit-product-site-rich-text';
import { WithLayoutType } from '@sbercloud/uikit-product-utils';

import styles from './styles.module.scss';

export type PromoListProps = { title: string; items: string[] };

export function PromoList({ title, items, layoutType }: WithLayoutType<PromoListProps>) {
  return (
    <div className={styles.promoList} data-layout-type={layoutType}>
      <div className={styles.title} data-layout-type={layoutType} data-test-id='promo-list__card_title'>
        <RichText richText={title} />
      </div>

      <ul className={styles.list}>
        {items.map(item => (
          <li className={styles.listItem} key={item}>
            <DecorCheckedSVG className={styles.listItemIcon} />
            <RichText richText={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
