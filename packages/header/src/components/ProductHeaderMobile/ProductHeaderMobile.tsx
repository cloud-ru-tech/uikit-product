import { useCallback, useMemo, useState } from 'react';

import {
  BurgerSVG,
  ChevronRightSVG,
  ExitSVG,
  NightSVG,
  QuestionSVG,
  SettingsSVG,
} from '@sbercloud/uikit-product-icons';
import { Themes, useLanguage, useTheme } from '@sbercloud/uikit-product-utils';
import { Avatar } from '@snack-uikit/avatar';
import { Breadcrumbs } from '@snack-uikit/breadcrumbs';
import { ButtonFunction } from '@snack-uikit/button';
import { Counter } from '@snack-uikit/counter';
import { DrawerCustom } from '@snack-uikit/drawer';
import { ItemProps, List } from '@snack-uikit/list';
import { Scroll } from '@snack-uikit/scroll';
import { Switch } from '@snack-uikit/toggles';

import {
  CloudRuLogo,
  DrawerMenuMobile,
  DrawerMenuProps,
  HeaderLayout,
  InvitePopover,
  Notifications,
  NotificationsTrigger,
  SelectMenu,
  SelectMenuTrigger,
} from '../../helperComponents';
import { filterHidden } from '../../helperComponents/DrawerMenu/utils';
import { textProvider, Texts } from '../../helpers';
import { Organization, Platform, ProductOption, Workspace } from '../../types';
import { ProductHeaderProps } from '../ProductHeader';
import styles from './styles.module.scss';

export function ProductHeaderMobile({
  // className,
  homePageUrl,
  onLogoClick,
  drawerMenu: {
    links,
    allProducts,
    selectedProduct,
    selectedLink,
    onLinkChange,
    onProductChange: onProductChangeProp,
    footerLinks,
    onClose: onDrawerClose,
  },

  select,
  organizations,
  selectedOrganization,
  onOrganizationChange: onOrganizationChangeProp,
  onOrganizationAdd: onOrganizationAddProp,

  pagePath,
  settings = [],
  onHelpMenuClick,
  notifications,
  userMenu, // ...rest
  showMainMenu = true,
}: ProductHeaderProps) {
  const {
    platforms,
    selectedProject,
    onPlatformChange,
    onProjectChange,
    selectedPlatform,
    projectAddButton: projectAddButtonProp,
    projects,
    workspaces,
    onClose: onSelectClose,
  } = select ?? {};

  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  const { theme } = useTheme();
  const isDarkTheme = [Themes.GreenDark, Themes.GreenDark].includes(theme);

  const visibleSettings = useMemo(() => settings?.filter(filterHidden), [settings]);

  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isProjectMenuOpen, setIsProjectMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const closeMainMenu = useCallback(() => {
    setIsMainMenuOpen(false);
    onDrawerClose?.();
  }, [onDrawerClose]);
  const closeProjectMenu = useCallback(() => {
    setIsProjectMenuOpen(false);
    onSelectClose?.();
  }, [onSelectClose]);
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

  const onOrganizationChange = useCallback(
    (item: Organization) => {
      onOrganizationChangeProp?.(item, 'select');
    },
    [onOrganizationChangeProp],
  );

  const onOrganizationAdd = useMemo(() => {
    if (!onOrganizationAddProp) return undefined;

    return () => {
      closeMainMenu();
      closeUserMenu();
      onOrganizationAddProp();
    };
  }, [closeMainMenu, closeUserMenu, onOrganizationAddProp]);

  const workspacesOptions = useMemo(
    () =>
      workspaces
        ? {
            ...workspaces,
            onWorkspaceChange(value: Workspace) {
              closeMainMenu();
              closeUserMenu();
              workspaces.onWorkspaceChange?.(value);
            },
            onWorkspaceAdd() {
              closeMainMenu();
              closeUserMenu();
              workspaces.onWorkspaceAdd?.();
            },
          }
        : undefined,
    [closeMainMenu, closeUserMenu, workspaces],
  );

  const projectAddButton = useMemo(() => {
    if (!projectAddButtonProp) return undefined;

    return {
      ...projectAddButtonProp,
      onClick() {
        closeMainMenu();
        closeUserMenu();
        projectAddButtonProp.onClick();
      },
    };
  }, [closeMainMenu, closeUserMenu, projectAddButtonProp]);

  const items = useMemo(() => {
    const items: ItemProps[] = [];

    if (select) {
      const { selectedProject } = select;

      items.push({
        content: {
          option: '',
        },
        onClick: () => {
          setIsProjectMenuOpen(true);
        },
        beforeContent: (
          <div className={styles.select} data-test-id='header__select'>
            <SelectMenuTrigger selectedProject={selectedProject} open={isProjectMenuOpen} showIcon={false} />
          </div>
        ),
        afterContent: <ChevronRightSVG />,
        className: styles.breadcrumbs,
      });

      items.push({
        divider: true,
        items: [],
      });
    }

    if (userMenu) {
      const { user, indicator, onLogout, onThemeSwitchClick, onProfileManagementClick } = userMenu;

      items.push({
        content: {
          option: userMenu?.user.name,
          description: user.email,
          truncate: {
            description: 1,
          },
        },
        afterContent: <Avatar size='s' name={user.name} showTwoSymbols indicator={indicator} />,
        inactive: true,
        id: 'header__user-menu-button',
        'data-test-id': 'header__user-menu-button',
        className: styles.userMenuInfoItem,
      });

      if (onProfileManagementClick) {
        items.push({
          'data-test-id': 'header__user-menu-manage-profile',
          beforeContent: <SettingsSVG />,
          onClick: () => {
            onProfileManagementClick();
            closeUserMenu();
          },
          content: {
            option: textProvider(languageCode, Texts.ManageProfile),
          },
          id: 'header__user-menu-manage-profile',
        });

        items.push({
          divider: true,
          items: [],
        });
      }

      if (onThemeSwitchClick) {
        items.push({
          content: {
            option: textProvider(languageCode, Texts.SwitchTheme),
          },
          beforeContent: <NightSVG />,
          afterContent: <Switch checked={isDarkTheme} />,
          onClick: () => {
            onThemeSwitchClick();
          },
          id: 'header__user-menu-switch-theme',
          'data-test-id': 'header__user-menu-switch-theme',
        });
      }

      if (onLogout) {
        items.push({
          content: {
            option: textProvider(languageCode, Texts.Logout),
          },
          beforeContent: <ExitSVG />,
          onClick: () => {
            onLogout();
            closeUserMenu();
          },
          id: 'header__user-menu-logout',
          'data-test-id': 'header__user-menu-logout',
        });
      }
    }

    if (visibleSettings.length > 0) {
      items.push({
        divider: true,
        items: visibleSettings.map(setting => ({
          'data-test-id': 'header__settings-item',
          content: {
            option: setting.label,
          },
          beforeContent: setting.icon,
          onClick: () => {
            setting.onClick();
            closeUserMenu();
          },
        })),
      });
    }

    return items;
  }, [select, userMenu, visibleSettings, isProjectMenuOpen, languageCode, closeUserMenu, isDarkTheme]);

  return (
    <>
      <HeaderLayout
        logo={<CloudRuLogo />}
        homePageUrl={homePageUrl}
        onLogoClick={onLogoClick}
        toolbar={
          <>
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

                {userMenu.invites?.count && userMenu.invites.count > 0 && (
                  <Counter
                    value={userMenu.invites.count}
                    appearance='primary'
                    size='s'
                    className={styles.userMenuAvatarCounter}
                  />
                )}

                {userMenu?.invites?.showPopover && (
                  <InvitePopover
                    onAcceptButtonClick={userMenu.invites.onAcceptButtonClick}
                    onCloseButtonClick={userMenu.invites.onCloseButtonClick}
                  />
                )}
              </div>
            )}
          </>
        }
        pathFooter
        path={pagePath && <Breadcrumbs items={pagePath ?? []} separator='/' size='xs' />}
        showMainMenu={showMainMenu}
        onMainMenuClick={() => {
          setIsMainMenuOpen(true);
        }}
      />

      <DrawerCustom
        open={isUserMenuOpen}
        onClose={closeUserMenu}
        position='left'
        className={styles.nestedDrawer}
        push={{ distance: 8 }}
        nestedDrawer={
          <DrawerCustom
            open={isProjectMenuOpen}
            onClose={closeProjectMenu}
            position='left'
            className={styles.nestedDrawer}
          >
            <DrawerCustom.Header title={textProvider(languageCode, Texts.Platforms)} className={styles.nestedHeader} />
            <Scroll>
              {select && (
                <div className={styles.selectGroup}>
                  <SelectMenu
                    organizations={organizations}
                    selectedOrganization={selectedOrganization}
                    onOrganizationChange={onOrganizationChange}
                    onOrganizationAdd={onOrganizationAdd}
                    projects={projects}
                    selectedProject={selectedProject ?? ({} as ProductOption)}
                    onProjectChange={onProjectChange}
                    projectAddButton={projectAddButton}
                    platforms={platforms}
                    selectedPlatform={selectedPlatform ?? ({} as Platform)}
                    onPlatformChange={onPlatformChange}
                    workspaces={workspacesOptions}
                    mobile
                  />
                </div>
              )}
            </Scroll>
          </DrawerCustom>
        }
      >
        <DrawerCustom.Header title={textProvider(languageCode, Texts.Menu)} className={styles.nestedHeader} />

        <Scroll>
          <div className={styles.selectGroup}>
            <List items={items} scroll size='m' selection={{ mode: 'single', value: selectedOrganization?.id }} />
          </div>
        </Scroll>
      </DrawerCustom>

      {showMainMenu && (
        <DrawerMenuMobile
          open={isMainMenuOpen}
          onClose={closeMainMenu}
          links={links}
          selectedLink={selectedLink}
          onLinkChange={onLinkChange}
          allProducts={allProducts}
          selectedProduct={selectedProduct}
          footerLinks={footerLinks}
          onProductChange={onProductChange}
        />
      )}

      {notifications && (
        <DrawerCustom
          open={isNotificationsOpen}
          onClose={() => {
            notifications.onOpenChange?.(false);
            setIsNotificationsOpen(false);
          }}
          // title='Уведомления'
          className={styles.notificationsDrawer}
          position='left'
        >
          <Notifications {...notifications} open={isNotificationsOpen} />
        </DrawerCustom>
      )}
    </>
  );
}
