import { useState } from 'react';

import { useLanguage } from '@sbercloud/uikit-product-utils';
import { Avatar, AvatarProps } from '@snack-uikit/avatar';
import { Divider } from '@snack-uikit/divider';
import { Droplist } from '@snack-uikit/droplist';
import { NightSVG, PlaceholderSVG, PlusSVG } from '@snack-uikit/icons';

import { textProvider, Texts } from '../../../../helpers';
import { SelectProps } from '../Select';
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
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const closeUserMenu = () => setIsUserMenuOpen(false);

  return (
    <Droplist
      open={isUserMenuOpen}
      onOpenChange={setIsUserMenuOpen}
      triggerElement={
        <div className={styles.userMenu} role={'button'} tabIndex={0} data-test-id='header__user-menu-button'>
          <Avatar size='xs' name={user.name} showTwoSymbols indicator={indicator} />
        </div>
      }
      placement='bottom-end'
    >
      <div className={styles.userMenuAvatarItem}>
        <div className={styles.userMenuAvatarItemName}>
          <span>{user.name}</span>
          <span>{user.email}</span>
        </div>
        <Avatar size='s' name={user.name} showTwoSymbols indicator={indicator} />
      </div>

      {onProfileManagementClick && (
        <>
          <Droplist.ItemSingle
            data-test-id='header__user-menu-manage-profile'
            option={textProvider(languageCode, Texts.ManageProfile)}
            icon={<PlaceholderSVG />}
            onClick={() => {
              onProfileManagementClick();
              closeUserMenu();
            }}
          />

          <Divider />
        </>
      )}

      {organizations.map(organization => (
        <Droplist.ItemSingle
          data-test-id='header__user-menu-organization'
          key={organization.id}
          option={organization.name}
          icon={<Avatar size='xs' name={organization.name} showTwoSymbols />}
          checked={organization.id === selectedOrganization.id}
          onClick={() => {
            onOrganizationChange?.(organization);
            closeUserMenu();
          }}
        />
      ))}

      {onOrganizationAdd && (
        <Droplist.ItemSingle
          data-test-id='header__user-menu-add-organization'
          option={textProvider(languageCode, Texts.AddOrganization)}
          icon={<PlusSVG />}
          onClick={() => {
            onOrganizationAdd();
            closeUserMenu();
          }}
        />
      )}

      {(organizations.length > 0 || onOrganizationAdd) && <Divider />}

      {onThemeSwitchClick && (
        <Droplist.ItemSingle
          data-test-id='header__user-menu-switch-theme'
          option={textProvider(languageCode, Texts.SwitchTheme)}
          icon={<NightSVG />}
          onClick={() => {
            onThemeSwitchClick();
            closeUserMenu();
          }}
        />
      )}

      {onLogout && (
        <Droplist.ItemSingle
          data-test-id='header__user-menu-logout'
          option={textProvider(languageCode, Texts.Logout)}
          icon={<PlaceholderSVG />}
          onClick={() => {
            onLogout();
            closeUserMenu();
          }}
        />
      )}
    </Droplist>
  );
}
