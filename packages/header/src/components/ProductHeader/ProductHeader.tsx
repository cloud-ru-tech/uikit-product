import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';

import { QuestionSVG, SettingsSVG } from '@sbercloud/uikit-product-icons';
import { WithSupportProps } from '@sbercloud/uikit-product-utils';
import { Breadcrumbs, BreadcrumbsProps } from '@snack-uikit/breadcrumbs';
import { ButtonFunction } from '@snack-uikit/button';
import { Droplist } from '@snack-uikit/list';

import {
  CloudRuLogo,
  DrawerMenuDesktop,
  DrawerMenuProps,
  FinancialMenu,
  FinancialMenuProps,
  HeaderLayout,
  HeaderLayoutProps,
  NotificationsPopover,
  NotificationsProps,
  Select,
  SelectProps,
  UserMenu,
  UserMenuProps,
} from '../../helperComponents';
import { DIVIDER_SETTING_OPTION_ID, DividerItem } from '../../types';
import { extractAppNameFromId } from '../../utils';
import styles from './styles.module.scss';

export type BaseSettingOption = {
  id: string;
  label: string;
  icon: ReactElement;
  onClick(): void;
  hidden?: boolean;
};

export type SettingOption = BaseSettingOption | DividerItem;

export function isDividerItem<T extends object>(item: T | DividerItem): item is DividerItem {
  return item && 'id' in item && item['id'] === DIVIDER_SETTING_OPTION_ID;
}

export type ProductHeaderProps = WithSupportProps<
  {
    className?: string;
    onSelectOpenChange?(open: boolean): void;
    drawerMenu: Pick<
      DrawerMenuProps,
      | 'links'
      | 'pinnedCards'
      | 'footerLinks'
      | 'allProducts'
      | 'selectedProduct'
      | 'onProductChange'
      | 'selectedLink'
      | 'onLinkChange'
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
      | 'projectsSearchActive'
      | 'onProjectsSearchActiveChange'
      | 'projectsEmptyState'
      | 'onProjectChange'
      | 'projectAddButton'
      | 'workspaces'
      | 'onClose'
    >;
    pagePath?: BreadcrumbsProps['items'];
    settings?: SettingOption[];
    onHelpMenuClick?(): void;
    notifications?: NotificationsProps;
    financialMenu?: FinancialMenuProps;
    userMenu?: Pick<
      UserMenuProps,
      | 'user'
      | 'indicator'
      | 'invites'
      | 'onAvatarClick'
      | 'onProfileManagementClick'
      | 'onLogout'
      | 'themeMode'
      | 'profileItemWrapRender'
    >;
  } & Pick<SelectProps, 'organizations' | 'selectedOrganization' | 'onOrganizationChange' | 'onOrganizationAdd'> &
    Pick<HeaderLayoutProps, 'homePageUrl' | 'onLogoClick' | 'showMainMenu' | 'disableMainMenu'>
>;

export function ProductHeader({
  className,
  homePageUrl,
  onLogoClick,
  drawerMenu: {
    links,
    pinnedCards,
    footerLinks,
    allProducts,
    selectedProduct,
    onProductChange,
    onClose,
    selectedLink,
    onLinkChange,
  },

  select,
  onSelectOpenChange,
  organizations,
  selectedOrganization,
  onOrganizationChange,
  onOrganizationAdd,

  pagePath,
  financialMenu,
  settings,
  onHelpMenuClick,
  notifications,
  userMenu,
  showMainMenu = true,
  disableMainMenu = false,
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
    let filteredSettings = settings?.filter(item => !item?.hidden);

    filteredSettings = filteredSettings?.reduce((res, item, idx) => {
      if (item.id !== DIVIDER_SETTING_OPTION_ID) {
        res.push(item);
      }

      if (
        item.id === DIVIDER_SETTING_OPTION_ID &&
        res.at(-1)?.id !== DIVIDER_SETTING_OPTION_ID &&
        res.length > 0 &&
        idx + 1 < (filteredSettings?.length || 0)
      ) {
        res.push(item);
      }

      return res;
    }, [] as SettingOption[]);

    if (filteredSettings && filteredSettings.length) {
      return filteredSettings.map(setting => {
        if (!isDividerItem<BaseSettingOption>(setting)) {
          return {
            'data-test-id': `header__settings__item-${extractAppNameFromId(setting.id)}`,
            content: {
              option: setting.label,
            },
            beforeContent: setting.icon,
            onClick: () => {
              setting.onClick();
              setIsSettingsOpen(false);
            },
          };
        }

        return {
          type: 'group',
          divider: true,
          hidden: setting.hidden,
          items: [],
        };
      });
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
        disableMainMenu={disableMainMenu}
        logo={<CloudRuLogo />}
        path={
          <>
            {select && (
              <Select
                {...select}
                onOpenChange={onSelectOpenChange}
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
                inactiveLastItem={pagePath.length > 1}
                separator='/'
                size='s'
                data-test-id='header__breadcrumbs'
              />
            )}
          </>
        }
        toolbar={
          <>
            {financialMenu && <FinancialMenu {...financialMenu} />}

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
                <ButtonFunction data-test-id='header__settings__menu-button' size='m' icon={<SettingsSVG />} />
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
          selectedLink={selectedLink}
          onLinkChange={onLinkChange}
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
