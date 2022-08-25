import { Avatar } from '@sbercloud/uikit-product-avatar';

import { HeaderToolbarItem, HeaderToolbarItemProps } from '../HeaderToolbarItem';

export type HeaderToolbarProfileItemProps = Omit<HeaderToolbarItemProps, 'icon'> & {
  name: string;
  src?: string;
};

export function HeaderToolbarProfileItem({ name, src, ...rest }: HeaderToolbarProfileItemProps) {
  return (
    <HeaderToolbarItem
      {...rest}
      icon={<Avatar name={name} src={src} variant={Avatar.variants.User} size={Avatar.sizes.ExtraSmall} />}
    />
  );
}
