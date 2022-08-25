import { HTMLAttributeAnchorTarget, MouseEventHandler, ReactElement } from 'react';

import { ButtonIcon } from '@sbercloud/uikit-product-button';
import { extractSupportProps, useMatchMedia, WithSupportProps } from '@sbercloud/uikit-product-utils';

import * as S from './styled';

export type HeaderToolbarItemProps = WithSupportProps<{
  icon: ReactElement;
  title: string;
  href?: string;
  target?: HTMLAttributeAnchorTarget;
  onClick?: MouseEventHandler<HTMLElement>;
}>;

export function HeaderToolbarItem({ icon, title, href, target, onClick, ...rest }: HeaderToolbarItemProps) {
  const { isMobile } = useMatchMedia();

  if (isMobile) {
    return (
      <S.Link href={href} target={target} onClick={onClick}>
        {icon}
        {title}
      </S.Link>
    );
  }

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
