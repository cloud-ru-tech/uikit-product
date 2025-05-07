import { useLocale } from '@sbercloud/uikit-product-locale';
import { DrawerCustom, DrawerProps } from '@snack-uikit/drawer';
import { List, ListProps } from '@snack-uikit/list';
import { Scroll } from '@snack-uikit/scroll';

import styles from '../styles.module.scss';
import { CommonMobileUserMenuProps } from '../types';

type UserMenuDrawerProps = Pick<ListProps, 'items' | 'selection'> &
  Pick<DrawerProps, 'nestedDrawer'> &
  CommonMobileUserMenuProps;

export function MobileUserMenuDrawer({ isOpen, setIsOpen, items, selection, nestedDrawer }: UserMenuDrawerProps) {
  const { t } = useLocale('Header');

  return (
    <DrawerCustom
      open={isOpen}
      onClose={() => setIsOpen(false)}
      position='right'
      push={{ distance: 8 }}
      nestedDrawer={nestedDrawer}
    >
      <DrawerCustom.Header title={t('user')} className={styles.nestedHeader} />

      <Scroll>
        <div className={styles.selectGroup}>
          <List items={items} scroll size='m' selection={selection} />
        </div>
      </Scroll>
    </DrawerCustom>
  );
}
