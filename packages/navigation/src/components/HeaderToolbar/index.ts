import {
  HeaderToolbarItem,
  HeaderToolbarItemProps,
  HeaderToolbarProfileItem,
  HeaderToolbarProfileItemProps,
  HeaderToolbarProfileMenu,
  HeaderToolbarProfileMenuAvatarItem,
  HeaderToolbarProfileMenuAvatarItemProps,
  HeaderToolbarProfileMenuItem,
  HeaderToolbarProfileMenuItemProps,
  HeaderToolbarProfileMenuProps,
  HeaderToolbarRoot,
  HeaderToolbarRootProps,
} from './components';

export namespace HeaderToolbar {
  export const Root = HeaderToolbarRoot;
  export type RootProps = HeaderToolbarRootProps;

  export const Item = HeaderToolbarItem;
  export type ItemProps = HeaderToolbarItemProps;

  export const ProfileItem = HeaderToolbarProfileItem;
  export type ProfileItemProps = HeaderToolbarProfileItemProps;

  export const ProfileMenu = HeaderToolbarProfileMenu;
  export type ProfileMenuProps = HeaderToolbarProfileMenuProps;

  export const ProfileMenuAvatarItem = HeaderToolbarProfileMenuAvatarItem;
  export type ProfileMenuAvatarItemProps = HeaderToolbarProfileMenuAvatarItemProps;

  export const ProfileMenuItem = HeaderToolbarProfileMenuItem;
  export type ProfileMenuItemProps = HeaderToolbarProfileMenuItemProps;
}
