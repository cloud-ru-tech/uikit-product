import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';

import { WithSupportProps } from '@sbercloud/uikit-product-utils';
import { Breadcrumbs, BreadcrumbsProps } from '@snack-uikit/breadcrumbs';
import { ButtonFunction } from '@snack-uikit/button';
import { QuestionSVG, SettingsSVG } from '@snack-uikit/icons';
import { Droplist } from '@snack-uikit/list';

import {
  CloudRuLogo,
  DrawerMenuDesktop,
  DrawerMenuProps,
  HeaderLayout,
  HeaderLayoutProps,
  NotificationsPopover,
  NotificationsProps,
  Select,
  SelectProps,
  UserMenu,
  UserMenuProps,
} from '../../helperComponents';
import { filterHidden } from '../../helperComponents/DrawerMenu/utils';
import styles from './styles.module.scss';

export type SettingOption = {
  label: string;
  icon: ReactElement;
  onClick(): void;
};

export type ProductHeaderProps = WithSupportProps<
  {
    className?: string;
    drawerMenu: Pick<
      DrawerMenuProps,
      'links' | 'pinnedCards' | 'footerLinks' | 'allProducts' | 'selectedProduct' | 'onProductChange'
    > & { onClose?(): void };
    select?: Pick<
      SelectProps,
      | 'platforms'
      | 'selectedPlatform'
      | 'onPlatformChange'
      | 'platformsLoading'
      | 'projects'
      | 'selectedProject'
      | 'projectsLoading'
      | 'onProjectChange'
      | 'projectAddButton'
      | 'workspaces'
      | 'onClose'
    >;
    pagePath?: BreadcrumbsProps['items'];
    settings?: SettingOption[];
    onHelpMenuClick?(): void;
    notifications?: NotificationsProps;
    userMenu?: Pick<
      UserMenuProps,
      | 'user'
      | 'indicator'
      | 'invites'
      | 'onAvatarClick'
      | 'onProfileManagementClick'
      | 'onThemeSwitchClick'
      | 'onLogout'
    >;
  } & Pick<SelectProps, 'organizations' | 'selectedOrganization' | 'onOrganizationChange' | 'onOrganizationAdd'> &
    Pick<HeaderLayoutProps, 'homePageUrl' | 'onLogoClick' | 'showMainMenu'>
>;

export function ProductHeader({
  className,
  homePageUrl,
  onLogoClick,
  drawerMenu: { links, pinnedCards, footerLinks, allProducts, selectedProduct, onProductChange, onClose },

  select,
  organizations,
  selectedOrganization,
  onOrganizationChange,
  onOrganizationAdd,

  pagePath,
  settings = [],
  onHelpMenuClick,
  notifications,
  userMenu,
  showMainMenu,
  ...rest
}: ProductHeaderProps) {
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const openListener = () => setIsMainMenuOpen(true);
    const closeListener = () => setIsMainMenuOpen(false);

    window.addEventListener('header__open-main-menu', openListener);
    window.addEventListener('header__close-main-menu', closeListener);

    return () => {
      window.removeEventListener('header__open-main-menu', openListener);
      window.removeEventListener('header__close-main-menu', closeListener);
    };
  }, []);

  const handleCloseMainMenu = useCallback(() => {
    setIsMainMenuOpen(false);
    onClose?.();
  }, [onClose]);

  const visibleSettings = useMemo(() => {
    const filteredSettings = settings?.filter(filterHidden);

    if (filteredSettings && filteredSettings.length) {
      return filteredSettings.map(setting => ({
        'data-test-id': 'header__settings-item',
        content: {
          option: setting.label,
        },
        beforeContent: setting.icon,
        onClick: () => {
          setting.onClick();
          setIsSettingsOpen(false);
        },
      }));
    }

    return undefined;
  }, [settings]);

  return (
    <>
      <HeaderLayout
        {...rest}
        className={className}
        homePageUrl={homePageUrl}
        onLogoClick={onLogoClick}
        onMainMenuClick={() => setIsMainMenuOpen(true)}
        showMainMenu={showMainMenu}
        logo={<CloudRuLogo />}
        path={
          <>
            {select && (
              <Select
                {...select}
                organizations={organizations}
                selectedOrganization={selectedOrganization}
                onOrganizationChange={onOrganizationChange}
                onOrganizationAdd={onOrganizationAdd}
              />
            )}

            {pagePath && (
              <Breadcrumbs
                className={styles.breadcrumbs}
                items={pagePath}
                separator='/'
                size='s'
                data-test-id='header__breadcrumbs'
              />
            )}
          </>
        }
        toolbar={
          <>
            {visibleSettings && (
              <Droplist
                size='s'
                open={isSettingsOpen}
                onOpenChange={setIsSettingsOpen}
                items={visibleSettings}
                placement='bottom-end'
                trigger='clickAndFocusVisible'
                className={styles.settingsDroplist}
              >
                <ButtonFunction data-test-id='header__settings-menu-button' size='m' icon={<SettingsSVG />} />
              </Droplist>
            )}

            {onHelpMenuClick && (
              <ButtonFunction
                data-test-id='header__help-menu-button'
                size='m'
                icon={<QuestionSVG />}
                onClick={onHelpMenuClick}
              />
            )}

            {notifications && <NotificationsPopover notifications={notifications} />}

            {userMenu && (
              <UserMenu
                {...userMenu}
                organizations={organizations}
                selectedOrganization={selectedOrganization}
                onOrganizationAdd={onOrganizationAdd}
                onOrganizationChange={onOrganizationChange}
              />
            )}
          </>
        }
      />

      {showMainMenu && (
        <DrawerMenuDesktop
          open={isMainMenuOpen}
          onClose={handleCloseMainMenu}
          links={links}
          pinnedCards={pinnedCards}
          allProducts={allProducts}
          selectedProduct={selectedProduct}
          onProductChange={onProductChange}
          footerLinks={footerLinks}
        />
      )}
    </>
  );
}
