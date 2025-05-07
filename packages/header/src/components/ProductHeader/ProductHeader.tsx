import { MouseEvent, ReactElement, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import { QuestionSVG, SettingsSVG } from '@sbercloud/uikit-product-icons';
import { WithSupportProps } from '@sbercloud/uikit-product-utils';
import { Breadcrumbs, BreadcrumbsProps } from '@snack-uikit/breadcrumbs';
import { ButtonFunction } from '@snack-uikit/button';
import { Droplist } from '@snack-uikit/list';

import {
  DrawerMenuDesktop,
  DrawerMenuProps,
  HeaderLayout,
  HeaderLayoutProps,
  NotificationsPopover,
  NotificationsProps,
  Select,
  SelectProps,
  UserMenu,
  UserMenuCustom,
  UserMenuProps,
} from '../../helperComponents';
import { DIVIDER_SETTING_OPTION_ID, DividerItem, HeaderLogo, VendorLogo } from '../../types';
import { extractAppNameFromId } from '../../utils';
import styles from './styles.module.scss';

export type BaseSettingOption = {
  id: string;
  label: string;
  icon: ReactElement;
  href?: string;
  onClick(e?: MouseEvent<HTMLElement>): void;
  hidden?: boolean;
};

export type SettingOption = BaseSettingOption | DividerItem;

export function isDividerItem<T extends object>(item: T | DividerItem): item is DividerItem {
  return item && 'id' in item && item['id'] === DIVIDER_SETTING_OPTION_ID;
}

export type ProductHeaderProps = WithSupportProps<
  {
    className?: string;
    drawerMenu: Pick<
      DrawerMenuProps,
      | 'links'
      | 'footerLinks'
      | 'allProducts'
      | 'selectedProduct'
      | 'onProductChange'
      | 'selectedLink'
      | 'onLinkChange'
      | 'favorites'
      | 'onMarketplaceBannerClick'
      | 'onReferralBannerClick'
      | 'hideProductSelect'
    > & { onClose?(): void };
    select?: Pick<
      SelectProps,
      | 'projects'
      | 'selectedProject'
      | 'projectsLoading'
      | 'projectsEmptyState'
      | 'onProjectChange'
      | 'projectAddButton'
      | 'organizations'
      | 'onOrganizationChange'
      | 'selectedOrganization'
      | 'onOpenChange'
    >;
    pagePath?: BreadcrumbsProps['items'];
    settings?: SettingOption[];
    onHelpMenuClick?(): void;
    onSearchChange?(value: string): void;
    onMainMenuClick?(): void;
    notifications?: NotificationsProps;
    financeButton?: ReactNode;
    userMenu?: UserMenuProps;
    logo?: HeaderLogo;
    vendorLogo?: VendorLogo;
  } & Pick<SelectProps, 'organizations'> &
    Pick<HeaderLayoutProps, 'homePageUrl' | 'onLogoClick' | 'showMainMenu' | 'disableMainMenu'>
>;

export function ProductHeader({
  className,
  homePageUrl,
  onLogoClick,
  onMainMenuClick,
  onSearchChange,
  drawerMenu: {
    links,
    favorites,
    onMarketplaceBannerClick,
    onReferralBannerClick,
    footerLinks,
    allProducts,
    selectedProduct,
    onProductChange,
    onClose,
    selectedLink,
    onLinkChange,
    hideProductSelect,
  },

  select,
  organizations,

  pagePath,
  financeButton,
  settings,
  onHelpMenuClick,
  notifications,
  userMenu,
  showMainMenu = true,
  disableMainMenu = false,
  logo,
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

  const handleMainMenuClick = useCallback(() => {
    setIsMainMenuOpen(true);
    onMainMenuClick?.();
  }, [onMainMenuClick]);

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
          const handleClick = (e?: MouseEvent<HTMLElement>) => {
            setting?.onClick(e);
            setIsSettingsOpen(false);
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
        onMainMenuClick={handleMainMenuClick}
        showMainMenu={showMainMenu}
        disableMainMenu={disableMainMenu}
        logo={logo}
        path={
          <>
            {select && <Select {...select} organizations={organizations} />}

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
            {financeButton}
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

            {userMenu &&
              ('customMenuItems' in userMenu ? (
                <UserMenuCustom {...userMenu} />
              ) : (
                <UserMenu {...userMenu} organizations={organizations} />
              ))}
          </>
        }
      />

      {showMainMenu && (
        <DrawerMenuDesktop
          open={isMainMenuOpen}
          onClose={handleCloseMainMenu}
          links={links}
          favorites={favorites}
          onMarketplaceBannerClick={onMarketplaceBannerClick}
          onReferralBannerClick={onReferralBannerClick}
          selectedLink={selectedLink}
          onLinkChange={onLinkChange}
          onSearchChange={onSearchChange}
          allProducts={allProducts}
          selectedProduct={selectedProduct}
          onProductChange={onProductChange}
          footerLinks={footerLinks}
          hideProductSelect={hideProductSelect}
        />
      )}
    </>
  );
}
