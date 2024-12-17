import { MouseEvent, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import { BurgerSVG, ChevronRightSVG, QuestionSVG } from '@sbercloud/uikit-product-icons';
import { useLanguage } from '@sbercloud/uikit-product-utils';
import { Breadcrumbs } from '@snack-uikit/breadcrumbs';
import { ButtonFunction } from '@snack-uikit/button';
import { Counter } from '@snack-uikit/counter';
import { DrawerCustom } from '@snack-uikit/drawer';
import { ItemProps, List } from '@snack-uikit/list';
import { Scroll } from '@snack-uikit/scroll';

import {
  DrawerMenuMobile,
  DrawerMenuProps,
  HeaderLayout,
  InvitePopover,
  MobileFinancialMenu,
  Notifications,
  NotificationsTrigger,
  PartnerPopover,
  SelectMenu,
  SelectMenuTrigger,
  useAlertMenu,
  useGeneralMenu,
  useLogoutMenu,
  useOrganizationsMenu,
  useProfileMenu,
} from '../../helperComponents';
import { getThemeModeOptions, textProvider, Texts } from '../../helpers';
import { DIVIDER_SETTING_OPTION_ID, Platform, ProductOption, Workspace } from '../../types';
import { extractAppNameFromId } from '../../utils';
import { isDividerItem, ProductHeaderProps } from '../ProductHeader';
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
  onSelectOpenChange,
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

  const visibleSettings = useMemo(
    () => settings?.filter(item => !item.hidden && item.id !== DIVIDER_SETTING_OPTION_ID),
    [settings],
  );

  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isProjectMenuOpen, setIsProjectMenuOpen] = useState(false);
  const [isThemeModeMenuOpen, setIsThemeModeMenuOpen] = useState(false);
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

  const onThemeSelectorClick = useCallback(() => {
    setIsThemeModeMenuOpen(true);
  }, []);

  const onProductChange = useCallback<DrawerMenuProps['onProductChange']>(
    item => {
      closeMainMenu();
      closeUserMenu();
      onProductChangeProp(item);
    },
    [closeMainMenu, closeUserMenu, onProductChangeProp],
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

  const profileMenu = useProfileMenu({
    user: userMenu?.user,
    indicator: userMenu?.indicator,
    onProfileManagementClick: userMenu?.onProfileManagementClick,
    profileItemWrapRender: userMenu?.profileItemWrapRender,
    closeUserMenu,
    hasDivider: Boolean(select),
  });

  const generalMenu = useGeneralMenu({
    onWhatsNewClick: userMenu?.onWhatsNewClick,
    closeUserMenu,
    onThemeSelectorClick: userMenu?.themeMode ? onThemeSelectorClick : undefined,
  });

  const organizationMenu = useOrganizationsMenu({
    organizations,
    onOrganizationAdd,
    onOrganizationChange,
    closeUserMenu,
  });

  const alertMenu = useAlertMenu(userMenu?.alert);

  const logoutMenu = useLogoutMenu({ onLogout: userMenu?.onLogout, closeUserMenu });

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
          handleProjectMenuOpen(true);
        },
        afterContent: <ChevronRightSVG />,
        className: styles.breadcrumbs,
      });
    }

    items.push(...profileMenu);
    items.push(...generalMenu);
    items.push(...organizationMenu);
    items.push(...alertMenu);
    items.push(...logoutMenu);

    if (visibleSettings && visibleSettings.length > 0) {
      items.push({
        type: 'group',
        divider: true,
        items: visibleSettings.map(setting => {
          if (!isDividerItem(setting)) {
            const handleClick = (e?: MouseEvent<HTMLElement>) => {
              setting?.onClick(e);
              closeUserMenu();
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
            hidden: setting.hidden,
            divider: true,
            items: [],
          };
        }),
      });
    }

    return items;
  }, [
    select,
    profileMenu,
    generalMenu,
    organizationMenu,
    logoutMenu,
    visibleSettings,
    isProjectMenuOpen,
    closeUserMenu,
    handleProjectMenuOpen,
    alertMenu,
  ]);

  const count = (userMenu?.invites?.count ?? 0) + (userMenu?.partnerInvites?.count ?? 0);

  return (
    <>
      <HeaderLayout
        logo={logo}
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
                {(userMenu?.partnerInvites?.showPopover && (
                  <PartnerPopover onCloseClick={userMenu?.partnerInvites?.onCloseClick} />
                )) ||
                  (userMenu?.invites?.showPopover && (
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
                      onOrganizationChange={item => onOrganizationChange?.(item, 'select')}
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
