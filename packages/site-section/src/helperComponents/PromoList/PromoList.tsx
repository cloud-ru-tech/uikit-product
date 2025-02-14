import { DecorCheckedSVG } from '@sbercloud/uikit-product-icons';
import { WithLayoutType } from '@sbercloud/uikit-product-utils';

import styles from './styles.module.scss';

export type PromoListProps = { title: string; items: string[] };

export function PromoList({ title, items, layoutType }: WithLayoutType<PromoListProps>) {
  return (
    <div className={styles.promoList} data-layout-type={layoutType}>
      <div className={styles.title} data-layout-type={layoutType} data-test-id='promo-list__card_title'>
        {title}
      </div>

      <ul className={styles.list}>
        {items.map(item => (
          <li className={styles.listItem} key={item}>
            <DecorCheckedSVG className={styles.listItemIcon} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
