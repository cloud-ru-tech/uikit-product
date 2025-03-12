import { MouseEvent, ReactNode, useCallback, useMemo, useState } from 'react';

import { ChevronRightSVG } from '@sbercloud/uikit-product-icons';
import { useLocale } from '@sbercloud/uikit-product-locale';
import { DrawerCustom } from '@snack-uikit/drawer';
import { ItemProps, List } from '@snack-uikit/list';
import { Scroll } from '@snack-uikit/scroll';

import { isDividerItem, ProductHeaderProps } from '../../../components/ProductHeader';
import { useGetThemeModeOptions } from '../../../hooks';
import { DIVIDER_SETTING_OPTION_ID, Platform, ProductOption, Workspace } from '../../../types';
import { extractAppNameFromId } from '../../../utils';
import { SelectMenu, SelectMenuTrigger } from '../../SelectMenu';
import { useAlertMenu, useGeneralMenu, useLogoutMenu, useOrganizationsMenu, useProfileMenu } from '../hooks';
import styles from '../styles.module.scss';
import { UserMenuProps } from '../types';
import { getPatchedListItems } from '../utils';
import { MobileUserMenuDrawer } from './MobileUserMenuDrawer';

type DefaultMobileUserMenuProps = Pick<
  ProductHeaderProps,
  | 'select'
  | 'organizations'
  | 'selectedOrganization'
  | 'onOrganizationChange'
  | 'onOrganizationAdd'
  | 'onSelectOpenChange'
  | 'settings'
> & {
  userMenu: UserMenuProps;
  setIsOpenUserMenu: (v: boolean) => void;
  isUserMenuOpen: boolean;
  closeMainMenu: () => void;
  isProjectMenuOpen: boolean;
  setIsProjectMenuOpen: (v: boolean) => void;
};

export function DefaultMobileUserMenu({
  select,
  organizations,
  selectedOrganization,
  onOrganizationChange,
  onOrganizationAdd: onOrganizationAddProp,
  userMenu,
  settings,
  setIsOpenUserMenu,
  isUserMenuOpen,
  closeMainMenu,
  setIsProjectMenuOpen,
  isProjectMenuOpen,
  onSelectOpenChange,
}: DefaultMobileUserMenuProps) {
  const {
    platforms,
    selectedProject,
    onPlatformChange,
    onProjectChange,
    selectedPlatform,
    projectAddButton: projectAddButtonProp,
    projects,
    workspaces,
    projectsEmptyState,
    onAccessRequestClick,
  } = select ?? {};

  const { t } = useLocale('Header');
  const isCustomItemsMode = 'customMenuItems' in userMenu;

  const closeUserMenu = useCallback(() => setIsOpenUserMenu(false), [setIsOpenUserMenu]);

  const visibleSettings = useMemo(
    () => settings?.filter(item => !item.hidden && item.id !== DIVIDER_SETTING_OPTION_ID),
    [settings],
  );

  const [isThemeModeMenuOpen, setIsThemeModeMenuOpen] = useState(false);

  const handleProjectMenuOpen = useCallback(
    (isOpen: boolean) => {
      setIsProjectMenuOpen(isOpen);
      onSelectOpenChange?.(isOpen);
    },
    [onSelectOpenChange, setIsProjectMenuOpen],
  );

  const onThemeSelectorClick = useCallback(() => {
    setIsThemeModeMenuOpen(true);
  }, []);

  const themeModeOptions = useGetThemeModeOptions({
    themeMode: 'themeMode' in userMenu ? userMenu?.themeMode : undefined,
  });

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
    onProfileManagementClick: 'onProfileManagementClick' in userMenu ? userMenu?.onProfileManagementClick : undefined,
    profileItemWrapRender: 'profileItemWrapRender' in userMenu ? userMenu?.profileItemWrapRender : undefined,
    closeUserMenu,
    hasDivider: Boolean(select),
  });

  const generalMenu = useGeneralMenu({
    onWhatsNewClick: 'onWhatsNewClick' in userMenu ? userMenu?.onWhatsNewClick : undefined,
    closeUserMenu,
    onThemeSelectorClick: 'themeMode' in userMenu && userMenu?.themeMode ? onThemeSelectorClick : undefined,
  });

  const organizationMenu = useOrganizationsMenu({
    organizations,
    onOrganizationAdd,
    onOrganizationChange,
    closeUserMenu,
  });

  const alertMenu = useAlertMenu('alert' in userMenu ? userMenu?.alert : undefined);

  const logoutMenu = useLogoutMenu({
    onLogout: 'onLogout' in userMenu ? userMenu?.onLogout : undefined,
    closeUserMenu,
  });

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

    if (isCustomItemsMode) {
      items.push({
        type: 'group',
        divider: Boolean(items.length),
        items: getPatchedListItems({ items: userMenu.customMenuItems, callback: closeUserMenu }),
      });
      return items;
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
    isCustomItemsMode,
    profileMenu,
    generalMenu,
    organizationMenu,
    alertMenu,
    logoutMenu,
    visibleSettings,
    isProjectMenuOpen,
    handleProjectMenuOpen,
    userMenu,
    closeUserMenu,
  ]);

  return (
    <MobileUserMenuDrawer
      selection={isCustomItemsMode ? undefined : { mode: 'single', value: selectedOrganization?.id }}
      setIsOpen={setIsOpenUserMenu}
      items={items}
      isOpen={isUserMenuOpen}
      nestedDrawer={
        <>
          <DrawerCustom open={isProjectMenuOpen} onClose={() => setIsProjectMenuOpen(false)} position='left'>
            <DrawerCustom.Header title={t('platforms')} className={styles.nestedHeader} />
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
                    onAccessRequestClick={onAccessRequestClick}
                    projectsEmptyState={projectsEmptyState}
                    mobile
                  />
                </div>
              )}
            </Scroll>
          </DrawerCustom>

          {'themeMode' in userMenu && themeModeOptions && (
            <DrawerCustom open={isThemeModeMenuOpen} onClose={() => setIsThemeModeMenuOpen(false)} position='left'>
              <DrawerCustom.Header title={t('themeModeLabel')} className={styles.nestedHeader} />
              <Scroll>
                <div className={styles.selectGroup}>
                  <List items={themeModeOptions} selection={{ mode: 'single' }} />
                </div>
              </Scroll>
            </DrawerCustom>
          )}
        </>
      }
    />
  );
}
