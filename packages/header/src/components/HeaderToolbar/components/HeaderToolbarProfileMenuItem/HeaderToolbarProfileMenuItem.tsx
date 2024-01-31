import cn from 'classnames';
import { HTMLAttributeAnchorTarget, MouseEvent, MouseEventHandler, ReactElement, useContext } from 'react';

import { DropdownItem } from '@sbercloud/uikit-product-dropdown';
import { Label, LabelProps } from '@sbercloud/uikit-product-label';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { DropdownMenuContext } from '../../../../contexts';
import * as S from './styled';

export type HeaderToolbarProfileMenuItemProps = WithSupportProps<{
  icon: ReactElement;
  title: string;
  href: string;
  target?: HTMLAttributeAnchorTarget;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  badge?: LabelProps;
}>;

export function HeaderToolbarProfileMenuItem({
  icon,
  title,
  href,
  target,
  onClick,
  badge,
  ...rest
}: HeaderToolbarProfileMenuItemProps) {
  const dropdownMenu = useContext(DropdownMenuContext);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    dropdownMenu.hide();
    onClick?.(event);
  }

  return (
    <S.Link href={href} target={target} onClick={handleClick} {...extractSupportProps(rest)}>
      <DropdownItem>
        {icon}
        {title}
        {badge && <Label {...badge} className={cn(badge.className, S.badgeClassName)} />}
      </DropdownItem>
    </S.Link>
  );
}
