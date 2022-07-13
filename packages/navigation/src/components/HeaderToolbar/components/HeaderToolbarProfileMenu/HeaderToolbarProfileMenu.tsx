import { Children, ReactNode } from 'react';

import { Avatar } from '@sbercloud/uikit-product-avatar';
import { DropdownMenu } from '@sbercloud/uikit-product-dropdown';
import { WithSupportProps } from '@sbercloud/uikit-product-utils';

import { AvatarContext, DropdownMenuContext } from '../../../../contexts';
import { Item } from './styled';

function noop() {}

export type HeaderToolbarProfileMenuProps = WithSupportProps<{
  name: string;
  children: ReactNode;
  src?: string;
}>;

export function HeaderToolbarProfileMenu({ name, children, src }: HeaderToolbarProfileMenuProps) {
  return (
    <DropdownMenu
      actions={({ hide }) => (
        <AvatarContext.Provider value={{ name, src }}>
          <DropdownMenuContext.Provider value={{ hide }}>
            {Children.map(children, child => (
              <Item>{child}</Item>
            ))}
          </DropdownMenuContext.Provider>
        </AvatarContext.Provider>
      )}
    >
      <Avatar name={name} src={src} onClick={noop} variant={Avatar.variants.User} size={Avatar.sizes.ExtraSmall} />
    </DropdownMenu>
  );
}
