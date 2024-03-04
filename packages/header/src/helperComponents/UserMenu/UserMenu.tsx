import { useMemo, useRef, useState } from 'react';

import { Themes, useLanguage, useTheme } from '@sbercloud/uikit-product-utils';
import { Avatar, AvatarProps } from '@snack-uikit/avatar';
import { Counter } from '@snack-uikit/counter';
import { NightSVG, PlaceholderSVG, PlusSVG } from '@snack-uikit/icons';
import { Droplist, ItemProps } from '@snack-uikit/list';
import { PromoTag } from '@snack-uikit/promo-tag';
import { Switch } from '@snack-uikit/toggles';

import { textProvider, Texts } from '../../helpers';
import { SelectProps } from '../SelectMenu';
import { InvitePopover, InvitePopoverProps } from './components/InvitePopover';
import styles from './styles.modules.scss';

export type User = {
  name: string;
  email: string;
};

export type UserMenuProps = {
  user: User;
  indicator?: AvatarProps['indicator'];
  onAvatarClick?(): void;
  onProfileManagementClick?(): void;
  onThemeSwitchClick?(): void;
  onLogout?(): void;
  invites?: {
    count?: number;
    showPopover?: boolean;
  } & Pick<InvitePopoverProps, 'onAcceptButtonClick' | 'onCloseButtonClick'>;
} & Pick<SelectProps, 'organizations' | 'selectedOrganization' | 'onOrganizationChange' | 'onOrganizationAdd'>;

export function UserMenu({
  user,
  indicator,
  onProfileManagementClick,
  onThemeSwitchClick,
  onLogout,
  onAvatarClick,
  organizations,
  selectedOrganization,
  onOrganizationChange,
  onOrganizationAdd,
  invites,
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
        afterContent: organization.new && (
          <PromoTag text={textProvider(languageCode, Texts.OrganizationNewBadge)} appearance='green' />
        ),
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
    <div className={styles.userMenuWrap}>
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
          onClick={onAvatarClick}
        >
          <Avatar size='xs' name={user.name} showTwoSymbols indicator={indicator} />

          {invites?.count && invites.count > 0 && (
            <Counter value={invites.count} appearance='primary' size='s' className={styles.userMenuAvatarCounter} />
          )}
        </div>
      </Droplist>

      {invites?.showPopover && (
        <InvitePopover
          onAcceptButtonClick={invites.onAcceptButtonClick}
          onCloseButtonClick={invites.onCloseButtonClick}
        />
      )}
    </div>
  );
}
