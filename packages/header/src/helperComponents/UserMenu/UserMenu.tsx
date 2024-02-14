import { useMemo, useRef, useState } from 'react';

import { Themes, useLanguage, useTheme } from '@sbercloud/uikit-product-utils';
import { Avatar, AvatarProps } from '@snack-uikit/avatar';
import { NightSVG, PlaceholderSVG, PlusSVG } from '@snack-uikit/icons';
import { Droplist, ItemProps } from '@snack-uikit/list';
import { Switch } from '@snack-uikit/toggles';

import { textProvider, Texts } from '../../helpers';
import { SelectProps } from '../SelectMenu';
import styles from './styles.modules.scss';

export type User = {
  name: string;
  email: string;
};

export type UserMenuProps = {
  user: User;
  indicator?: AvatarProps['indicator'];
  onProfileManagementClick?(): void;
  onThemeSwitchClick?(): void;
  onLogout?(): void;
} & Pick<SelectProps, 'organizations' | 'selectedOrganization' | 'onOrganizationChange' | 'onOrganizationAdd'>;

export function UserMenu({
  user,
  indicator,
  onProfileManagementClick,
  onThemeSwitchClick,
  onLogout,
  organizations,
  selectedOrganization,
  onOrganizationChange,
  onOrganizationAdd,
}: UserMenuProps) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  const { theme } = useTheme();
  const isDarkTheme = [Themes.GreenDark, Themes.GreenDark].includes(theme);

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const closeUserMenu = () => setIsUserMenuOpen(false);

  const triggerRef = useRef<HTMLDivElement>(null);

  const items = useMemo(() => {
    const items: ItemProps[] = [];

    items.push({
      content: {
        option: user.name,
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

    organizations.forEach(organization =>
      items.push({
        'data-test-id': 'header__user-menu-organization',
        beforeContent: <Avatar size='xs' name={organization.name} showTwoSymbols />,
        content: {
          option: organization.name,
        },
        onClick: () => {
          onOrganizationChange?.(organization);
          closeUserMenu();
        },
        id: organization.id,
      }),
    );

    if (onOrganizationAdd) {
      items.push({
        content: {
          option: textProvider(languageCode, Texts.AddOrganization),
        },
        beforeContent: <PlusSVG />,
        onClick: () => {
          onOrganizationAdd();
          closeUserMenu();
        },
        id: 'header__user-menu-add-organization',
        'data-test-id': 'header__user-menu-add-organization',
      });
    }

    if (organizations.length > 0 || onOrganizationAdd) {
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
        onClick: onThemeSwitchClick,
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

    return items;
  }, [
    indicator,
    isDarkTheme,
    languageCode,
    onLogout,
    onOrganizationAdd,
    onOrganizationChange,
    onProfileManagementClick,
    onThemeSwitchClick,
    organizations,
    user.email,
    user.name,
  ]);

  return (
    <Droplist
      size='s'
      open={isUserMenuOpen}
      onOpenChange={setIsUserMenuOpen}
      placement='bottom-end'
      items={items}
      selection={{
        mode: 'single',
        value: selectedOrganization.id,
      }}
      marker={false}
      triggerElemRef={triggerRef}
      trigger='clickAndFocusVisible'
    >
      <div
        className={styles.userMenu}
        role={'button'}
        tabIndex={0}
        data-test-id='header__user-menu-button'
        ref={triggerRef}
      >
        <Avatar size='xs' name={user.name} showTwoSymbols indicator={indicator} />
      </div>
    </Droplist>
  );
}
