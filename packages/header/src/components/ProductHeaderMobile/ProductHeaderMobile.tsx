import { useCallback, useEffect, useState } from 'react';

import { BurgerSVG, QuestionSVG } from '@sbercloud/uikit-product-icons';
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
  MobileFinancialMenu,
  Notifications,
  NotificationsTrigger,
  PartnerPopover,
} from '../../helperComponents';
import { ProductHeaderProps } from '../ProductHeader';
import styles from './styles.module.scss';

export function ProductHeaderMobile({
  homePageUrl,
  onLogoClick,
  drawerMenu: { onProductChange: onProductChangeProp, onClose: onDrawerClose, ...drawerMenuProps },

  select,
  organizations,
  selectedOrganization,
  onOrganizationChange,
  onOrganizationAdd: onOrganizationAddProp,
  financialMenu,
  pagePath,
  settings,
  onHelpMenuClick,
  notifications,
  userMenu,
  showMainMenu = true,
  disableMainMenu,
  logo,
  vendorLogo,
  onSelectOpenChange,
}: ProductHeaderProps) {
  const { onClose: onSelectClose } = select ?? {};

  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isProjectMenuOpen, setIsProjectMenuOpen] = useState(false);

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

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
    onSelectClose?.();
  }, [handleProjectMenuOpen, onSelectClose]);

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
        logo={logo}
        vendorLogo={vendorLogo}
        homePageUrl={homePageUrl}
        onLogoClick={onLogoClick}
        toolbar={
          <>
            {financialMenu && <MobileFinancialMenu {...financialMenu} />}

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
                  setIsNotificationsOpen(true);
                }}
              />
            )}

            {userMenu && (
              <div className={styles.userMenuButtonWrap}>
                <ButtonFunction size='m' icon={<BurgerSVG />} onClick={() => setIsUserMenuOpen(v => !v)} />

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
        path={pagePath && <Breadcrumbs items={pagePath ?? []} separator='/' size='xs' />}
        showMainMenu={showMainMenu}
        disableMainMenu={disableMainMenu}
        onMainMenuClick={() => {
          setIsMainMenuOpen(true);
        }}
      />

      {userMenu && (
        <DefaultMobileUserMenu
          userMenu={userMenu}
          onOrganizationChange={onOrganizationChange}
          onSelectOpenChange={onSelectOpenChange}
          settings={settings}
          organizations={organizations}
          selectedOrganization={selectedOrganization}
          onOrganizationAdd={onOrganizationAddProp}
          isProjectMenuOpen={isProjectMenuOpen}
          isUserMenuOpen={isUserMenuOpen}
          setIsProjectMenuOpen={setIsProjectMenuOpen}
          select={select}
          closeMainMenu={closeMainMenu}
          setIsOpenUserMenu={setIsUserMenuOpen}
        />
      )}

      {showMainMenu && (
        <DrawerMenuMobile
          open={isMainMenuOpen}
          onClose={closeMainMenu}
          onProductChange={onProductChange}
          favorites={drawerMenuProps.favorites}
          {...drawerMenuProps}
        />
      )}

      {notifications && (
        <DrawerCustom
          open={isNotificationsOpen}
          onClose={() => {
            notifications.onOpenChange?.(false);
            setIsNotificationsOpen(false);
          }}
          className={styles.notificationsDrawer}
          position='left'
        >
          <Notifications {...notifications} open={isNotificationsOpen} isMobile />
        </DrawerCustom>
      )}
    </>
  );
}
