import { MouseEvent, ReactNode, useCallback, useMemo, useState } from 'react';

import { useLocale } from '@sbercloud/uikit-product-locale';
import { MobileModalCustom } from '@sbercloud/uikit-product-mobile-modal';
import { ItemProps, List } from '@snack-uikit/list';
import { Scroll } from '@snack-uikit/scroll';

import { isDividerItem, ProductHeaderProps } from '../../../components/ProductHeader';
import { useGetThemeModeOptions } from '../../../hooks';
import { DIVIDER_SETTING_OPTION_ID } from '../../../types';
import { extractAppNameFromId } from '../../../utils';
import { useAlertMenu, useGeneralMenu, useLogoutMenu, useOrganizationsMenu, useProfileMenu } from '../hooks';
import styles from '../styles.module.scss';
import { DefaultUserMenuProps, UserMenuProps } from '../types';
import { getPatchedListItems } from '../utils';
import { MobileUserMenuDrawer } from './MobileUserMenuDrawer';

type DefaultMobileUserMenuProps = Pick<ProductHeaderProps, 'organizations' | 'settings'> & {
  userMenu: UserMenuProps;
  setIsOpenUserMenu(v: boolean): void;
  isUserMenuOpen: boolean;
  closeMainMenu: () => void;
};

export function DefaultMobileUserMenu({
  organizations,
  userMenu,
  settings,
  setIsOpenUserMenu,
  isUserMenuOpen,
  closeMainMenu,
}: DefaultMobileUserMenuProps) {
  const { t } = useLocale('Header');
  const isCustomItemsMode = 'customMenuItems' in userMenu;

  const closeUserMenu = useCallback(() => setIsOpenUserMenu(false), [setIsOpenUserMenu]);

  const visibleSettings = useMemo(
    () => settings?.filter(item => !item.hidden && item.id !== DIVIDER_SETTING_OPTION_ID),
    [settings],
  );

  const [isThemeModeMenuOpen, setIsThemeModeMenuOpen] = useState(false);

  const onThemeSelectorClick = useCallback(() => {
    setIsThemeModeMenuOpen(true);
  }, []);

  const themeModeOptions = useGetThemeModeOptions({
    themeMode: 'themeMode' in userMenu ? userMenu?.themeMode : undefined,
  });

  const onOrganizationAdd = useMemo(() => {
    if (!(userMenu as DefaultUserMenuProps).onOrganizationAdd) return undefined;

    return () => {
      closeMainMenu();
      closeUserMenu();
      (userMenu as DefaultUserMenuProps).onOrganizationAdd?.();
    };
  }, [closeMainMenu, closeUserMenu, userMenu]);

  const topAlertMenu = useAlertMenu('topAlert' in userMenu ? userMenu?.topAlert : undefined, false);
  const bottomAlertMenu = useAlertMenu('bottomAlert' in userMenu ? userMenu?.bottomAlert : undefined);

  const profileMenu = useProfileMenu({
    user: userMenu?.user,
    indicator: userMenu?.indicator,
    onProfileManagementClick: 'onProfileManagementClick' in userMenu ? userMenu?.onProfileManagementClick : undefined,
    profileItemWrapRender: 'profileItemWrapRender' in userMenu ? userMenu?.profileItemWrapRender : undefined,
    closeUserMenu,
    hasDivider: Boolean(topAlertMenu?.length),
  });

  const generalMenu = useGeneralMenu({
    onWhatsNewClick: 'onWhatsNewClick' in userMenu ? userMenu?.onWhatsNewClick : undefined,
    closeUserMenu,
    onThemeSelectorClick: 'themeMode' in userMenu && userMenu?.themeMode ? onThemeSelectorClick : undefined,
  });

  const organizationMenu = useOrganizationsMenu({
    organizations,
    onOrganizationAdd,
    onOrganizationChange: (userMenu as DefaultUserMenuProps).onOrganizationChange,
    closeUserMenu,
  });

  const logoutMenu = useLogoutMenu({
    onLogout: 'onLogout' in userMenu ? userMenu?.onLogout : undefined,
    closeUserMenu,
  });

  const items = useMemo(() => {
    const items: ItemProps[] = [];

    if (isCustomItemsMode) {
      items.push({
        type: 'group',
        divider: Boolean(items.length),
        items: getPatchedListItems({ items: userMenu.customMenuItems, callback: closeUserMenu }),
      });

      return items;
    }

    items.push(...topAlertMenu);
    items.push(...profileMenu);
    items.push(...generalMenu);
    items.push(...organizationMenu);
    items.push(...bottomAlertMenu);
    items.push(...logoutMenu);

    if (visibleSettings && visibleSettings.length > 0) {
      items.push({
        type: 'group',
        divider: true,
        items: visibleSettings.map(setting => {
          if (!isDividerItem(setting)) {
            const handleClick = (e?: MouseEvent<HTMLElement>) => {
              setting?.onClick(e);
              closeUserMenu();
            };

            return {
              'data-test-id': `header__settings__item-${extractAppNameFromId(setting.id)}`,
              content: {
                option: setting.label,
              },
              itemWrapRender: setting.href
                ? (item: ReactNode) => (
                    <a href={setting.href} onClick={handleClick}>
                      {item}
                    </a>
                  )
                : undefined,
              beforeContent: setting.icon,
              onClick: !setting.href ? handleClick : undefined,
            };
          }

          return {
            type: 'group',
            hidden: setting.hidden,
            divider: true,
            items: [],
          };
        }),
      });
    }

    return items;
  }, [
    isCustomItemsMode,
    profileMenu,
    generalMenu,
    organizationMenu,
    topAlertMenu,
    bottomAlertMenu,
    logoutMenu,
    visibleSettings,
    userMenu,
    closeUserMenu,
  ]);

  return (
    <>
      <MobileUserMenuDrawer
        selection={isCustomItemsMode ? undefined : { mode: 'single', value: userMenu.selectedOrganization?.id }}
        setIsOpen={setIsOpenUserMenu}
        items={items}
        isOpen={isUserMenuOpen}
      />

      {'themeMode' in userMenu && themeModeOptions && (
        <MobileModalCustom
          open={isThemeModeMenuOpen}
          onClose={() => setIsThemeModeMenuOpen(false)}
          closeButtonEnabled
          closeOnPopstate
        >
          <MobileModalCustom.Header title={t('themeModeLabel')} className={styles.nestedHeader} />
          <Scroll>
            <List items={themeModeOptions} size='l' selection={{ mode: 'single' }} />
          </Scroll>
        </MobileModalCustom>
      )}
    </>
  );
}
