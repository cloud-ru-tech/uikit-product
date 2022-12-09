import { useContext } from 'react';

import { Avatar } from '@sbercloud/uikit-product-avatar';

import { AvatarContext } from '../../../../contexts';
import { HeaderToolbarProfileMenuItem, HeaderToolbarProfileMenuItemProps } from '../HeaderToolbarProfileMenuItem';

export type HeaderToolbarProfileMenuAvatarItemProps = Omit<HeaderToolbarProfileMenuItemProps, 'icon'>;

export function HeaderToolbarProfileMenuAvatarItem(props: HeaderToolbarProfileMenuAvatarItemProps) {
  const avatar = useContext(AvatarContext);

  return (
    <HeaderToolbarProfileMenuItem
      icon={
        <Avatar name={avatar.name} src={avatar.src} variant={Avatar.variants.User} size={Avatar.sizes.ExtraSmall} />
      }
      {...props}
    />
  );
}
