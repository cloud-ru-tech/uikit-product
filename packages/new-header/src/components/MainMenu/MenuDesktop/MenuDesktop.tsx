import cn from 'classnames';

import { DrawerCustom } from '@snack-uikit/drawer';
import { isBaseItemProps, List } from '@snack-uikit/list';
import { Scroll } from '@snack-uikit/scroll';
import { useValueControl } from '@snack-uikit/utils';

import { Content } from '../Content';
import { useMenuItems } from '../hooks';
import { SearchDesktop } from '../Search';
import { MainMenuProps } from '../types';
import styles from './styles.module.scss';

export function MenuDesktop({
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

  const { groupItems, scrollRef, searchRef, resultItems } = useMenuItems({
    serviceGroups,
    search,
    favorite,
  });

  const isInitialEmptyCards = serviceGroups?.length === 0;
  const isNeedRightBlock = rightTop || !isInitialEmptyCards;

  const settingItemsWithClassName = settingItems.filter(isBaseItemProps).map(item => ({
    ...item,
    className: styles.item,
  }));

  return (
    <DrawerCustom
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      size={isNeedRightBlock ? 'm' : 's'}
      position='left'
      className={styles.drawer}
      rootClassName={styles.drawerRoot}
      data-test-id='header__drawer-menu'
      data-small={!isNeedRightBlock || undefined}
    >
      <div className={styles.menu}>
        <div className={styles.left}>
          {leftTop && <div className={styles.leftTop}>{leftTop}</div>}

          {!isInitialEmptyCards && (
            <List
              items={groupItems.map(item => ({
                ...item,
                className: styles.item,
              }))}
              pinBottom={settingItemsWithClassName}
              scroll
              size='m'
              barHideStrategy='never'
              className={styles.list}
            />
          )}

          {!leftTop && isInitialEmptyCards && <div />}

          {isInitialEmptyCards && settingItemsWithClassName.length > 0 && (
            <div className={cn(styles.list, styles.halfList)}>
              <List
                items={settingItems.filter(isBaseItemProps).map(item => ({
                  ...item,
                  className: styles.item,
                }))}
                size='m'
                barHideStrategy='never'
              />
            </div>
          )}
        </div>

        {isNeedRightBlock && (
          <div className={styles.right}>
            <Scroll paddingAbsolute className={styles.scroll} ref={scrollRef} barHideStrategy='never'>
              {isInitialEmptyCards && rightTop && <div className={styles.bannersWrap}>{rightTop}</div>}

              {!isInitialEmptyCards && (
                <Content
                  onClose={() => {
                    setOpen(false);
                  }}
                  className={styles.rightContent}
                  search={search && <SearchDesktop {...search} ref={searchRef} />}
                  searchValue={search && search.searchValue}
                  banners={rightTop}
                  favorite={favorite}
                  serviceGroups={resultItems}
                  onLinkChange={onLinkChange}
                />
              )}
            </Scroll>
          </div>
        )}
      </div>
    </DrawerCustom>
  );
}
