import { useCallback, useMemo, useState } from 'react';

import { InvitePopover } from '../InvitePopover';
import { PartnerPopover } from '../PartnerPopover';
import { UserMenuDroplist } from './components';
import { useAlertMenu, useGeneralMenu, useLogoutMenu, useOrganizationsMenu, useProfileMenu } from './hooks';
import styles from './styles.module.scss';
import { DefaultUserMenuProps } from './types';

export function UserMenu({
  user,
  indicator,
  onProfileManagementClick,
  onLogout,
  onAvatarClick,
  organizations,
  selectedOrganization,
  onOrganizationChange,
  onOrganizationAdd,
  themeMode,
  invites,
  profileItemWrapRender,
  partnerInvites,
  onWhatsNewClick,
  bottomAlert,
}: DefaultUserMenuProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const closeUserMenu = useCallback(() => setIsUserMenuOpen(false), []);

  const profileMenu = useProfileMenu({
    user,
    indicator,
    profileItemWrapRender,
    onProfileManagementClick,
    closeUserMenu,
  });

  const generalMenu = useGeneralMenu({ themeMode, onWhatsNewClick, closeUserMenu });

  const organizationMenu = useOrganizationsMenu({
    organizations,
    onOrganizationAdd,
    onOrganizationChange,
    closeUserMenu,
  });

  const alertMenu = useAlertMenu(bottomAlert);

  const logoutMenu = useLogoutMenu({ onLogout, closeUserMenu });

  const items = useMemo(
    () => [...profileMenu, ...generalMenu, ...organizationMenu, ...alertMenu, ...logoutMenu],
    [profileMenu, generalMenu, organizationMenu, logoutMenu, alertMenu],
  );

  const count = (invites?.count ?? 0) + (partnerInvites?.count ?? 0);

  return (
    <div className={styles.userMenuWrap}>
      <UserMenuDroplist
        isOpen={isUserMenuOpen}
        setIsOpen={setIsUserMenuOpen}
        items={items}
        count={count}
        user={user}
        onAvatarClick={onAvatarClick}
        indicator={indicator}
        selection={{
          mode: 'single',
          value: selectedOrganization?.id,
        }}
      />

      {(partnerInvites?.showPopover && <PartnerPopover onCloseClick={partnerInvites?.onCloseClick} />) ||
        (invites?.showPopover && <InvitePopover onOpenButtonClick={invites?.onOpenButtonClick} />)}
    </div>
  );
}
