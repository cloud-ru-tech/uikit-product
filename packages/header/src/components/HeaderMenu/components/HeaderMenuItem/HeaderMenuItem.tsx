import { HTMLAttributeAnchorTarget, MouseEvent, MouseEventHandler, ReactElement, useContext } from 'react';

import { DropdownItem } from '@sbercloud/uikit-product-dropdown';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { DropdownMenuContext } from '../../../../contexts';
import * as S from './styled';

export type HeaderMenuItemProps = WithSupportProps<{
  icon: ReactElement;
  title: string;
  href: string;
  target?: HTMLAttributeAnchorTarget;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}>;

export function HeaderMenuItem({ icon, title, href, target, onClick, ...rest }: HeaderMenuItemProps) {
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
      </DropdownItem>
    </S.Link>
  );
}
