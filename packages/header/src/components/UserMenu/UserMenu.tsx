import { useMemo } from 'react';

import { useLocale } from '@sbercloud/uikit-product-locale';
import { MobileDrawerCustom } from '@sbercloud/uikit-product-mobile-drawer';
import { Avatar } from '@snack-uikit/avatar';
import { ButtonFunction } from '@snack-uikit/button';
import { BaseItemProps, Droplist, List, ListProps } from '@snack-uikit/list';
import { Scroll } from '@snack-uikit/scroll';
import { useValueControl } from '@snack-uikit/utils';

import { useUserMenuItems } from './hooks/useUserMenuItems';
import styles from './styles.module.scss';
import { ThemeProps, UserProfileProps } from './types';

export type UserMenuProps = {
  profile?: UserProfileProps;

  theme?: ThemeProps;

  items?: ListProps['items'];

  settingItems?: BaseItemProps[];

  onLogout?(): void;

  open?: boolean;
  setOpen?(open: boolean): void;

  onClick?(): void;

  isMobile?: boolean;
};

export function UserMenu({
  profile = {},
  open: openProp,
  setOpen: setOpenProp,
  onLogout,
  items,
  settingItems,
  theme,
  isMobile,
  onClick,
}: UserMenuProps) {
  const { t } = useLocale('Header');

  const [open = false, setOpen] = useValueControl<boolean>({ value: openProp, onChange: setOpenProp });

  const { fullName = '', inviteCount } = profile;

  const userMenuItems = useUserMenuItems({
    isMobile,
    profile,
    theme,
    items,
    settingItems,
    onClose: () => {
      setOpen(false);
    },
    onLogout,
  });

  const trigger = useMemo(
    () => (
      <ButtonFunction
        size='m'
        onClick={() => {
          setOpen?.(true);
          onClick?.();
        }}
        counter={
          Number(inviteCount)
            ? {
                value: Number(inviteCount),
                appearance: 'primary',
              }
            : undefined
        }
        data-test-id='header__user-menu__button'
        icon={<Avatar size='xs' name={fullName} showTwoSymbols />}
      />
    ),
    [fullName, inviteCount, onClick, setOpen],
  );

  if (isMobile) {
    return (
      <>
        {trigger}

        <MobileDrawerCustom
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          position='right'
          swipeEnabled={false}
          data-test-id='header__user-menu-mobile'
          closeOnPopstate
        >
          <MobileDrawerCustom.Header title={t('user')} />
          <Scroll barHideStrategy='never'>
            <div className={styles.mobileList}>
              <List
                items={userMenuItems}
                selection={{
                  mode: 'single',
                  value: 'null',
                }}
                size='m'
              />
            </div>
          </Scroll>
        </MobileDrawerCustom>
      </>
    );
  }

  return (
    <>
      <Droplist
        items={userMenuItems}
        selection={{
          mode: 'single',
          value: 'null',
        }}
        trigger='click'
        placement='bottom-end'
        className={styles.userMenuDroplist}
        closeOnPopstate
        closeDroplistOnItemClick
        data-test-id='header__user-menu'
      >
        {trigger}
      </Droplist>
    </>
  );
}
