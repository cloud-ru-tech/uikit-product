import { ReactNode } from 'react';

import { AvatarProps } from '@snack-uikit/avatar';
import { DroplistProps } from '@snack-uikit/list';

import { ThemeMode } from '../../types';
import { InvitePopoverProps } from '../InvitePopover';
import { PartnerPopoverProps } from '../PartnerPopover';
import { SelectProps } from '../SelectMenu';
import { UseAlertMenuProps, User } from './hooks';

export type CommonUserMenuProps = {
  user: User;
  indicator?: AvatarProps['indicator'];
  onAvatarClick?(): void;
};

export type DefaultUserMenuProps = CommonUserMenuProps & {
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
  } & {
    alert?: UseAlertMenuProps;
  };

export type CustomUserMenuProps = CommonUserMenuProps & { customMenuItems: DroplistProps['items'] };

export type UserMenuProps = DefaultUserMenuProps | CustomUserMenuProps;

export type CommonMobileUserMenuProps = { isOpen: boolean; setIsOpen: (open: boolean) => void };
