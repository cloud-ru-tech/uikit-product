import { ReactElement, useState } from 'react';

import { WithSupportProps } from '@sbercloud/uikit-product-utils';
import { Breadcrumbs, BreadcrumbsProps } from '@snack-uikit/breadcrumbs';
import { ButtonFunction } from '@snack-uikit/button';
import { Divider } from '@snack-uikit/divider';
import { Droplist } from '@snack-uikit/droplist';
import { QuestionSVG, SettingsSVG } from '@snack-uikit/icons';

import {
  CloudRuLogo,
  DrawerMenu,
  DrawerMenuProps,
  HeaderLayout,
  Notifications,
  NotificationsProps,
  Select,
  SelectProps,
  UserMenu,
  UserMenuProps,
} from './components';
import styles from './styles.module.scss';

type SettingOption = {
  label: string;
  icon: ReactElement;
  onClick(): void;
};

export type ProductHeaderProps = WithSupportProps<
  {
    className?: string;
    homePageUrl: string;
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
      | 'onProjectAdd'
    >;
    pagePath?: BreadcrumbsProps['items'];
    settings?: SettingOption[];
    onHelpMenuClick?(): void;
    notifications?: NotificationsProps;
    userMenu?: Pick<
      UserMenuProps,
      'user' | 'indicator' | 'onProfileManagementClick' | 'onThemeSwitchClick' | 'onLogout'
    >;
  } & Pick<SelectProps, 'organizations' | 'selectedOrganization' | 'onOrganizationChange' | 'onOrganizationAdd'>
>;

export function ProductHeader({
  className,
  homePageUrl,
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

  return (
    <>
      <HeaderLayout
        {...rest}
        className={className}
        homePageUrl={homePageUrl}
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
              <>
                <div className={styles.divider}>
                  <Divider orientation='vertical' />
                </div>

                <Breadcrumbs
                  className={styles.breadcrumbs}
                  items={pagePath}
                  separator='/'
                  size='s'
                  lastEmpty
                  data-test-id='header__breadcrumbs'
                />
              </>
            )}
          </>
        }
        toolbar={
          <>
            {settings?.length > 0 && (
              <Droplist
                open={isSettingsOpen}
                onOpenChange={setIsSettingsOpen}
                triggerElement={
                  <ButtonFunction data-test-id='header__settings-menu-button' size='m' icon={<SettingsSVG />} />
                }
                placement='bottom-end'
              >
                {settings.map(setting => (
                  <Droplist.ItemSingle
                    data-test-id='header__settings-item'
                    key={setting.label}
                    option={setting.label}
                    icon={setting.icon}
                    onClick={() => {
                      setting.onClick();
                      setIsSettingsOpen(false);
                    }}
                  />
                ))}
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

            {notifications && <Notifications {...notifications} />}

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

      <DrawerMenu
        open={isMainMenuOpen}
        onClose={() => setIsMainMenuOpen(false)}
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
