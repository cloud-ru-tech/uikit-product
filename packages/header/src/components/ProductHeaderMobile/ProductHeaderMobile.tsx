import { useCallback, useEffect, useState } from 'react';

import { QuestionSVG } from '@sbercloud/uikit-product-icons';
import { Avatar } from '@snack-uikit/avatar';
import { Breadcrumbs } from '@snack-uikit/breadcrumbs';
import { ButtonFunction } from '@snack-uikit/button';
import { Counter } from '@snack-uikit/counter';
import { DrawerCustom } from '@snack-uikit/drawer';

import {
  DefaultMobileUserMenu,
  DrawerMenuMobile,
  DrawerMenuProps,
  HeaderLayout,
  InvitePopover,
  Notifications,
  NotificationsTrigger,
  PartnerPopover,
} from '../../helperComponents';
import { useNotifications } from '../../hooks/useNotifications';
import { ProductHeaderProps } from '../ProductHeader';
import styles from './styles.module.scss';

export function ProductHeaderMobile({
  homePageUrl,
  onLogoClick,
  drawerMenu: { onProductChange: onProductChangeProp, onClose: onDrawerClose, ...drawerMenuProps },

  select,
  organizations,
  onSearchChange,
  financeButton,
  pagePath,
  settings,
  onHelpMenuClick,
  notifications: notificationsProps,
  userMenu,
  showMainMenu = true,
  disableMainMenu,
  logo,
  onMainMenuClick,
  vendorLogo,
  ...rest
}: ProductHeaderProps) {
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isProjectMenuOpen, setIsProjectMenuOpen] = useState(false);
  const notifications = useNotifications(notificationsProps);

  const onSelectOpenChange = select?.onOpenChange;

  const handleProjectMenuOpen = useCallback(
    (isOpen: boolean) => {
      setIsProjectMenuOpen(isOpen);
      onSelectOpenChange?.(isOpen);
    },
    [onSelectOpenChange],
  );

  useEffect(() => {
    const closeListener = () => {
      setIsMainMenuOpen(false);
      setIsUserMenuOpen(false);
    };

    window.addEventListener('header__close-main-menu', closeListener);

    return () => {
      window.removeEventListener('header__close-main-menu', closeListener);
    };
  }, [setIsMainMenuOpen]);

  const closeMainMenu = useCallback(() => {
    setIsMainMenuOpen(false);
    onDrawerClose?.();
  }, [onDrawerClose]);

  const closeProjectMenu = useCallback(() => {
    handleProjectMenuOpen(false);
  }, [handleProjectMenuOpen]);

  const closeUserMenu = useCallback(() => {
    setIsUserMenuOpen(false);
    closeProjectMenu();
  }, [closeProjectMenu]);

  const onProductChange = useCallback<DrawerMenuProps['onProductChange']>(
    item => {
      closeMainMenu();
      closeUserMenu();
      onProductChangeProp(item);
    },
    [closeMainMenu, closeUserMenu, onProductChangeProp],
  );

  const count =
    (userMenu && 'invites' in userMenu ? userMenu?.invites?.count ?? 0 : 0) +
    (userMenu && 'partnerInvites' in userMenu ? userMenu?.partnerInvites?.count ?? 0 : 0);

  return (
    <>
      <HeaderLayout
        {...rest}
        logo={logo}
        vendorLogo={vendorLogo}
        homePageUrl={homePageUrl}
        onLogoClick={onLogoClick}
        toolbar={
          <>
            {financeButton}
            {onHelpMenuClick && (
              <ButtonFunction
                data-test-id='header__help-menu-button'
                size='m'
                icon={<QuestionSVG />}
                onClick={onHelpMenuClick}
              />
            )}

            {notifications && (
              <NotificationsTrigger
                count={notifications.count}
                onClick={() => {
                  notifications.onNotifyTriggerClick?.();
                  notifications.onOpenChange?.(true);
                }}
              />
            )}

            {userMenu && (
              <div className={styles.userMenuButtonWrap}>
                <div
                  role='button'
                  tabIndex={0}
                  data-test-id='header__user-menu__button'
                  onClick={() => setIsUserMenuOpen(v => !v)}
                >
                  <Avatar size='xs' name={userMenu.user.name} showTwoSymbols indicator={userMenu.indicator} />
                </div>

                {count > 0 && (
                  <Counter value={count} appearance='primary' size='s' className={styles.userMenuAvatarCounter} />
                )}

                {('partnerInvites' in userMenu && userMenu?.partnerInvites?.showPopover && (
                  <PartnerPopover onCloseClick={userMenu?.partnerInvites?.onCloseClick} />
                )) ||
                  ('invites' in userMenu && userMenu?.invites?.showPopover && (
                    <InvitePopover onOpenButtonClick={() => setIsUserMenuOpen(true)} />
                  ))}
              </div>
            )}
          </>
        }
        pathFooter
        path={
          pagePath && (
            <Breadcrumbs
              data-test-id='header__breadcrumbs'
              items={pagePath ?? []}
              inactiveLastItem={pagePath.length > 1}
              separator='/'
              size='xs'
            />
          )
        }
        showMainMenu={showMainMenu}
        disableMainMenu={disableMainMenu}
        onMainMenuClick={() => {
          setIsMainMenuOpen(true);
          onMainMenuClick?.();
        }}
      />

      {userMenu && (
        <DefaultMobileUserMenu
          userMenu={userMenu}
          settings={settings}
          organizations={organizations}
          isUserMenuOpen={isUserMenuOpen}
          closeMainMenu={closeMainMenu}
          setIsOpenUserMenu={setIsUserMenuOpen}
        />
      )}

      {showMainMenu && (
        <DrawerMenuMobile
          open={isMainMenuOpen}
          onSearchChange={onSearchChange}
          onClose={closeMainMenu}
          onProductChange={onProductChange}
          favorites={drawerMenuProps.favorites}
          isProjectMenuOpen={isProjectMenuOpen}
          handleProjectMenuOpen={handleProjectMenuOpen}
          select={
            select
              ? {
                  ...select,
                  onOpenChange: onSelectOpenChange,
                  closeDropdown: () => {
                    closeProjectMenu();
                    closeMainMenu();
                  },
                }
              : undefined
          }
          organizations={organizations}
          {...drawerMenuProps}
        />
      )}

      {notifications && (
        <DrawerCustom
          open={notifications.open}
          onClose={() => {
            notifications.onOpenChange?.(false);
          }}
          className={styles.notificationsDrawer}
          position='right'
        >
          <Notifications {...notifications} open={notifications?.open || false} isMobile />
        </DrawerCustom>
      )}
    </>
  );
}
