import { useCallback, useMemo, useState } from 'react';

import { Themes, useLanguage, useTheme } from '@sbercloud/uikit-product-utils';
import { Avatar } from '@snack-uikit/avatar';
import { Breadcrumbs } from '@snack-uikit/breadcrumbs';
import { ButtonFunction } from '@snack-uikit/button';
import { DrawerCustom } from '@snack-uikit/drawer';
import { ChevronRightSVG, NightSVG, PlaceholderSVG, QuestionSVG } from '@snack-uikit/icons';
import { ItemProps, List } from '@snack-uikit/list';
import { Scroll } from '@snack-uikit/scroll';
import { Switch } from '@snack-uikit/toggles';

import {
  CloudRuLogo,
  DrawerMenuMobile,
  DrawerMenuProps,
  HeaderLayout,
  Notifications,
  NotificationsTrigger,
  SelectMenu,
  SelectMenuTrigger,
} from '../../helperComponents';
import { textProvider, Texts } from '../../helpers';
import { Organization, Platform, ProductOption, Project } from '../../types';
import { ProductHeaderProps } from '../ProductHeader';
import styles from './styles.module.scss';

export function ProductHeaderMobile({
  // className,
  homePageUrl,
  drawerMenu: { links, allProducts, selectedProduct, onProductChange: onProductChangeProp, footerLinks },

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
}: ProductHeaderProps) {
  const {
    platforms,
    selectedProject,
    onPlatformChange: onPlatformChangeProp,
    onProjectChange: onProjectChangeProp,
    selectedPlatform,
    onProjectAdd: onProjectAddProp,
    projects,
  } = select ?? {};

  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  const { theme } = useTheme();
  const isDarkTheme = [Themes.GreenDark, Themes.GreenDark].includes(theme);

  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isProjectMenuOpen, setIsProjectMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const closeMainMenu = useCallback(() => setIsMainMenuOpen(false), []);
  const closeProjectMenu = useCallback(() => setIsProjectMenuOpen(false), []);
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
      closeMainMenu();
      closeUserMenu();
      onOrganizationChangeProp?.(item);
    },
    [closeMainMenu, closeUserMenu, onOrganizationChangeProp],
  );

  const onOrganizationAdd = useCallback(() => {
    closeMainMenu();
    closeUserMenu();
    onOrganizationAddProp?.();
  }, [closeMainMenu, closeUserMenu, onOrganizationAddProp]);

  const onProjectChange = useCallback(
    (project: Project) => {
      closeMainMenu();
      closeUserMenu();
      onProjectChangeProp?.(project);
    },
    [closeMainMenu, closeUserMenu, onProjectChangeProp],
  );

  const onPlatformChange = useCallback(
    (platform: Platform) => {
      closeMainMenu();
      closeUserMenu();
      onPlatformChangeProp?.(platform);
    },
    [closeMainMenu, closeUserMenu, onPlatformChangeProp],
  );

  const onProjectAdd = useCallback(() => {
    closeMainMenu();
    closeUserMenu();
    onProjectAddProp?.();
  }, [closeMainMenu, closeUserMenu, onProjectAddProp]);

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
            <SelectMenuTrigger selectedProject={selectedProject} />
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
        },
        afterContent: <Avatar size='s' name={user.name} showTwoSymbols indicator={indicator} />,
        inactive: true,
        id: 'header__user-menu-button',
        'data-test-id': 'header__user-menu-button',
      });

      if (onProfileManagementClick) {
        items.push({
          'data-test-id': 'header__user-menu-manage-profile',
          beforeContent: <PlaceholderSVG />,
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
          beforeContent: <PlaceholderSVG />,
          onClick: () => {
            onLogout();
            closeUserMenu();
          },
          id: 'header__user-menu-logout',
          'data-test-id': 'header__user-menu-logout',
        });
      }
    }

    if (settings.length > 0) {
      items.push({
        divider: true,
        items: settings.map(setting => ({
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
  }, [select, userMenu, settings, languageCode, closeUserMenu, isDarkTheme]);

  return (
    <>
      <HeaderLayout
        logo={<CloudRuLogo />}
        homePageUrl={homePageUrl}
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
                items={notifications.items}
                onClick={() => {
                  notifications.onNotifyTriggerClick?.();
                  notifications.onOpenChange?.(true);
                  setIsNotificationsOpen(true);
                }}
              />
            )}

            {userMenu && (
              <ButtonFunction size='m' icon={<PlaceholderSVG />} onClick={() => setIsUserMenuOpen(v => !v)} />
            )}
          </>
        }
        pathFooter
        path={pagePath && <Breadcrumbs items={pagePath ?? []} separator='/' size='xs' lastEmpty />}
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
            <DrawerCustom.Header title={'Платформы'} className={styles.nestedHeader} />
            <Scroll>
              {select && (
                <div className={styles.selectGroup}>
                  <SelectMenu
                    organizations={organizations}
                    selectedOrganization={selectedOrganization}
                    onOrganizationChange={onOrganizationChange}
                    onOrganizationAdd={onOrganizationAdd}
                    projects={projects ?? []}
                    selectedProject={selectedProject ?? ({} as ProductOption)}
                    onProjectChange={onProjectChange}
                    onProjectAdd={onProjectAdd}
                    platforms={platforms ?? []}
                    selectedPlatform={selectedPlatform ?? ({} as Platform)}
                    onPlatformChange={onPlatformChange}
                  />
                </div>
              )}
            </Scroll>
          </DrawerCustom>
        }
      >
        <DrawerCustom.Header title={'Меню'} className={styles.nestedHeader} />

        <Scroll>
          <div className={styles.selectGroup}>
            <List items={items} scroll size='m' selection={{ mode: 'single', value: selectedOrganization.id }} />
          </div>
        </Scroll>
      </DrawerCustom>

      <DrawerMenuMobile
        open={isMainMenuOpen}
        onClose={closeMainMenu}
        links={links}
        allProducts={allProducts}
        selectedProduct={selectedProduct}
        footerLinks={footerLinks}
        onProductChange={onProductChange}
      />

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
