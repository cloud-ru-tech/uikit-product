import { useCallback, useMemo, useState } from 'react';

import {
  BurgerSVG,
  ChevronRightSVG,
  ExitSVG,
  QuestionSVG,
  SettingsSVG,
  ThemeContrastSVG,
} from '@sbercloud/uikit-product-icons';
import { useLanguage } from '@sbercloud/uikit-product-utils';
import { Avatar } from '@snack-uikit/avatar';
import { Breadcrumbs } from '@snack-uikit/breadcrumbs';
import { ButtonFunction } from '@snack-uikit/button';
import { Counter } from '@snack-uikit/counter';
import { DrawerCustom } from '@snack-uikit/drawer';
import { ItemProps, List } from '@snack-uikit/list';
import { Scroll } from '@snack-uikit/scroll';

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
import { getThemeModeOptions } from '../../helpers/getThemeModeOptions';
import { Organization, Platform, ProductOption, Workspace } from '../../types';
import { extractAppNameFromId } from '../../utils';
import { ProductHeaderProps } from '../ProductHeader';
import styles from './styles.module.scss';

export function ProductHeaderMobile({
  // className,
  homePageUrl,
  onLogoClick,
  drawerMenu: { onProductChange: onProductChangeProp, onClose: onDrawerClose, ...drawerMenuProps },

  select,
  organizations,
  selectedOrganization,
  onOrganizationChange: onOrganizationChangeProp,
  onOrganizationAdd: onOrganizationAddProp,

  pagePath,
  settings,
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
    projectsEmptyState,
  } = select ?? {};

  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  const visibleSettings = useMemo(() => settings?.filter(filterHidden), [settings]);

  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isProjectMenuOpen, setIsProjectMenuOpen] = useState(false);
  const [isThemeModeMenuOpen, setIsThemeModeMenuOpen] = useState(false);
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
        content: (
          <div className={styles.select} data-test-id='header__select'>
            <SelectMenuTrigger selectedProject={selectedProject} open={isProjectMenuOpen} showIcon={false} />
          </div>
        ),
        onClick: () => {
          setIsProjectMenuOpen(true);
        },
        afterContent: <ChevronRightSVG />,
        className: styles.breadcrumbs,
      });

      items.push({
        type: 'group',
        divider: true,
        items: [],
      });
    }

    if (userMenu) {
      const { user, indicator, onLogout, onProfileManagementClick, themeMode } = userMenu;

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
        id: 'header__user-menu__button',
        'data-test-id': 'header__user-menu__button',
        className: styles.userMenuInfoItem,
      });

      if (onProfileManagementClick) {
        items.push({
          'data-test-id': 'header__user-menu__manage-profile',
          beforeContent: <SettingsSVG />,
          onClick: () => {
            onProfileManagementClick();
            closeUserMenu();
          },
          content: {
            option: textProvider(languageCode, Texts.ManageProfile),
          },
          id: 'header__user-menu__manage-profile',
        });
      }

      if (themeMode) {
        items.push({
          content: {
            option: textProvider(languageCode, Texts.ThemeModeLabel),
          },
          onClick: () => {
            setIsThemeModeMenuOpen(true);
          },
          afterContent: <ChevronRightSVG />,
          beforeContent: <ThemeContrastSVG />,
          'data-test-id': 'header__user-menu__theme-mode',
        });
      }

      if (themeMode || onProfileManagementClick) {
        items.push({
          type: 'group',
          divider: true,
          items: [],
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
          id: 'header__user-menu__logout',
          'data-test-id': 'header__user-menu__logout',
        });
      }
    }

    if (visibleSettings && visibleSettings.length > 0) {
      items.push({
        type: 'group',
        divider: true,
        items: visibleSettings.map(setting => ({
          'data-test-id': `header__settings__item-${extractAppNameFromId(setting.id)}`,
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
  }, [select, userMenu, visibleSettings, isProjectMenuOpen, languageCode, closeUserMenu]);

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

                {userMenu?.invites?.showPopover && <InvitePopover onOpenButtonClick={() => setIsUserMenuOpen(true)} />}
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
        push={{ distance: 8 }}
        nestedDrawer={
          <>
            <DrawerCustom open={isProjectMenuOpen} onClose={closeProjectMenu} position='left'>
              <DrawerCustom.Header
                title={textProvider(languageCode, Texts.Platforms)}
                className={styles.nestedHeader}
              />
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
                      projectsEmptyState={projectsEmptyState}
                      mobile
                    />
                  </div>
                )}
              </Scroll>
            </DrawerCustom>
            {userMenu?.themeMode && (
              <DrawerCustom open={isThemeModeMenuOpen} onClose={() => setIsThemeModeMenuOpen(false)} position='left'>
                <DrawerCustom.Header
                  title={textProvider(languageCode, Texts.ThemeModeLabel)}
                  className={styles.nestedHeader}
                />
                <Scroll>
                  <div className={styles.selectGroup}>
                    <List
                      items={getThemeModeOptions({ themeMode: userMenu.themeMode, languageCode })}
                      selection={{ mode: 'single' }}
                    />
                  </div>
                </Scroll>
              </DrawerCustom>
            )}
          </>
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
          onProductChange={onProductChange}
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
          <Notifications {...notifications} open={isNotificationsOpen} />
        </DrawerCustom>
      )}
    </>
  );
}
