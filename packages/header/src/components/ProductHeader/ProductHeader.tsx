import { ReactElement, useCallback, useMemo, useState } from 'react';

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
    >;
    select?: Pick<
      SelectProps,
      | 'platforms'
      | 'selectedPlatform'
      | 'onPlatformChange'
      | 'projects'
      | 'selectedProject'
      | 'onProjectChange'
      | 'projectAddButton'
      | 'workspaces'
    >;
    pagePath?: BreadcrumbsProps['items'];
    settings?: SettingOption[];
    onHelpMenuClick?(): void;
    notifications?: NotificationsProps;
    userMenu?: Pick<
      UserMenuProps,
      'user' | 'indicator' | 'onProfileManagementClick' | 'onThemeSwitchClick' | 'onLogout'
    >;
  } & Pick<SelectProps, 'organizations' | 'selectedOrganization' | 'onOrganizationChange' | 'onOrganizationAdd'> &
    Pick<HeaderLayoutProps, 'homePageUrl' | 'onLogoClick'>
>;

export function ProductHeader({
  className,
  homePageUrl,
  onLogoClick,
  drawerMenu: { links, pinnedCards, footerLinks, allProducts, selectedProduct, onProductChange },

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
  ...rest
}: ProductHeaderProps) {
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleCloseMainMenu = useCallback(() => setIsMainMenuOpen(false), []);

  const visibleSettings = useMemo(() => settings?.filter(filterHidden), [settings]);

  return (
    <>
      <HeaderLayout
        {...rest}
        className={className}
        homePageUrl={homePageUrl}
        onLogoClick={onLogoClick}
        onMainMenuClick={() => setIsMainMenuOpen(true)}
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
            {visibleSettings?.length > 0 && (
              <Droplist
                size='s'
                open={isSettingsOpen}
                onOpenChange={setIsSettingsOpen}
                items={visibleSettings.map(setting => ({
                  'data-test-id': 'header__settings-item',
                  content: {
                    option: setting.label,
                  },
                  beforeContent: setting.icon,
                  onClick: () => {
                    setting.onClick();
                    setIsSettingsOpen(false);
                  },
                }))}
                placement='bottom-end'
                trigger='clickAndFocusVisible'
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
    </>
  );
}
