import { useLocale } from '@cloud-ru/uikit-product-locale';
import { MobileDrawerCustom } from '@cloud-ru/uikit-product-mobile-drawer';
import { isBaseItemProps, List } from '@snack-uikit/list';
import { Scroll } from '@snack-uikit/scroll';
import { useValueControl } from '@snack-uikit/utils';

import { Content } from '../Content';
import { useMenuItems } from '../hooks';
import { SearchMobile } from '../Search';
import { MainMenuProps } from '../types';
import styles from './styles.module.scss';

export function MenuMobile({
  open: openProp,
  setOpen: setOpenProp,
  settingItems,
  leftTop,
  rightTop,
  serviceGroups,
  favorite,
  search,
  onLinkChange,
}: MainMenuProps) {
  const [open = false, setOpen] = useValueControl<boolean>({ value: openProp, onChange: setOpenProp });

  const { t } = useLocale('Header');

  const isInitialEmptyCards = serviceGroups?.length === 0;

  const { searchRef, resultItems } = useMenuItems({
    serviceGroups,
    search,
    favorite,
  });

  return (
    <MobileDrawerCustom
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      className={styles.drawerMobile}
      swipeEnabled={false}
      data-test-id='header__drawer-menu-mobile'
      closeOnPopstate
    >
      <MobileDrawerCustom.Header title={t('navigation')} />

      <Scroll barHideStrategy='never'>
        <div className={styles.scrollMobile}>
          {top && <div className={styles.rightContent}>{leftTop}</div>}

          {!isInitialEmptyCards && (
            <Content
              isMobile
              onClose={() => {
                setOpen(false);
              }}
              onLinkChange={onLinkChange}
              search={search && <SearchMobile {...search} ref={searchRef} />}
              className={styles.rightContent}
              searchValue={search && search.searchValue}
              banners={rightTop}
              favorite={favorite}
              serviceGroups={resultItems}
            />
          )}

          {isInitialEmptyCards && rightTop && <div className={styles.bannersWrap}>{rightTop}</div>}

          {settingItems.length > 0 && (
            <List
              className={styles.settings}
              items={[{ type: 'group', items: [], divider: true }, ...settingItems.filter(isBaseItemProps)]}
              size='m'
              barHideStrategy='never'
            />
          )}
        </div>
      </Scroll>
    </MobileDrawerCustom>
  );
}
