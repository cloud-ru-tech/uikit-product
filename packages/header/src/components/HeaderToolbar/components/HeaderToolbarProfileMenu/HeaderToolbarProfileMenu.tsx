import { Children, ReactNode } from 'react';

import { Avatar } from '@sbercloud/uikit-product-avatar';
import { Badge, BadgeProps } from '@sbercloud/uikit-product-badge-private';
import { DropdownMenu } from '@sbercloud/uikit-product-dropdown';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { AvatarContext, DropdownMenuContext } from '../../../../contexts';
import * as S from './styled';

function noop() {}

export type HeaderToolbarProfileMenuProps = WithSupportProps<{
  name: string;
  children: ReactNode;
  src?: string;
  badge?: Omit<BadgeProps, 'children'>;
}>;

export function HeaderToolbarProfileMenu({ name, children, src, badge, ...rest }: HeaderToolbarProfileMenuProps) {
  const avatar = (
    <Avatar name={name} src={src} onClick={noop} variant={Avatar.variants.User} size={Avatar.sizes.ExtraSmall} />
  );

  return (
    <DropdownMenu
      actions={({ hide }) => (
        <AvatarContext.Provider value={{ name, src }}>
          <DropdownMenuContext.Provider value={{ hide }}>
            {Children.map(children, child => (
              <S.Item>{child}</S.Item>
            ))}
          </DropdownMenuContext.Provider>
        </AvatarContext.Provider>
      )}
      {...extractSupportProps(rest)}
    >
      {badge ? <Badge {...badge}>{avatar}</Badge> : avatar}
    </DropdownMenu>
  );
}
