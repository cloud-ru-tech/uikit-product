import { HTMLAttributeAnchorTarget, MouseEventHandler, ReactElement } from 'react';

import { ButtonIcon } from '@sbercloud/uikit-product-button';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

export type HeaderToolbarItemProps = WithSupportProps<{
  icon: ReactElement;
  title: string;
  href?: string;
  target?: HTMLAttributeAnchorTarget;
  onClick?: MouseEventHandler<HTMLElement>;
}>;

export function HeaderToolbarItem({ icon, title, href, target, onClick, ...rest }: HeaderToolbarItemProps) {
  return (
    <ButtonIcon
      icon={icon}
      href={href}
      target={target}
      tooltip={{ title }}
      onClick={onClick}
      {...extractSupportProps(rest)}
    />
  );
}
