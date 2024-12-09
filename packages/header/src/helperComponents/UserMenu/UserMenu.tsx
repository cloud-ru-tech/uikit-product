import { ReactNode, useMemo, useRef, useState } from 'react';

import { Avatar, AvatarProps } from '@snack-uikit/avatar';
import { Counter } from '@snack-uikit/counter';
import { Droplist } from '@snack-uikit/list';

import { ThemeMode } from '../../types';
import { InvitePopover, InvitePopoverProps } from '../InvitePopover';
import { PartnerPopover, PartnerPopoverProps } from '../PartnerPopover';
import { SelectProps } from '../SelectMenu';
import { useGeneralMenu, useLogoutMenu, useOrganizationsMenu, useProfileMenu, User } from './hooks';
import styles from './styles.module.scss';

export type UserMenuProps = {
  user: User;
  indicator?: AvatarProps['indicator'];
  onAvatarClick?(): void;
  onProfileManagementClick?(): void;
  onLogout?(): void;
  onWhatsNewClick?(): void;
  invites?: {
    count?: number;
    showPopover?: boolean;
  } & Pick<InvitePopoverProps, 'onOpenButtonClick'>;
  partnerInvites?: {
    count?: number;
    showPopover?: boolean;
  } & Pick<PartnerPopoverProps, 'onCloseClick'>;
} & Pick<SelectProps, 'organizations' | 'selectedOrganization' | 'onOrganizationChange' | 'onOrganizationAdd'> & {
    themeMode?: {
      value: ThemeMode;
      onChange(value: ThemeMode): void;
    };
    profileItemWrapRender?(item: ReactNode): ReactNode;
  };

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
}: UserMenuProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const closeUserMenu = () => setIsUserMenuOpen(false);

  const triggerRef = useRef<HTMLDivElement>(null);

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

  const logoutMenu = useLogoutMenu({ onLogout, closeUserMenu });

  const items = useMemo(
    () => [...profileMenu, ...generalMenu, ...organizationMenu, ...logoutMenu],
    [profileMenu, generalMenu, organizationMenu, logoutMenu],
  );

  const count = (invites?.count ?? 0) + (partnerInvites?.count ?? 0);

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
          value: selectedOrganization?.id,
        }}
        triggerElemRef={triggerRef}
        trigger='click'
        className={styles.userMenuDroplist}
      >
        <div
          className={styles.userMenu}
          role={'button'}
          tabIndex={0}
          data-test-id='header__user-menu__button'
          ref={triggerRef}
          onClick={onAvatarClick}
        >
          <Avatar size='xs' name={user.name} showTwoSymbols indicator={indicator} />

          {count > 0 && (
            <Counter value={count} appearance='primary' size='s' className={styles.userMenuAvatarCounter} />
          )}
        </div>
      </Droplist>

      {(partnerInvites?.showPopover && <PartnerPopover onCloseClick={partnerInvites?.onCloseClick} />) ||
        (invites?.showPopover && <InvitePopover onOpenButtonClick={invites?.onOpenButtonClick} />)}
    </div>
  );
}
