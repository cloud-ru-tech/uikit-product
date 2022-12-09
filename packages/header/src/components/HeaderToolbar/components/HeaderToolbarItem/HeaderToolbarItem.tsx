import { HTMLAttributeAnchorTarget, MouseEventHandler, ReactElement } from 'react';

import { ButtonIcon } from '@sbercloud/uikit-product-button';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import * as S from './styled';

export type HeaderToolbarItemProps = WithSupportProps<{
  className?: string;
  icon: ReactElement;
  title: string;
  href?: string;
  target?: HTMLAttributeAnchorTarget;
  onClick?: MouseEventHandler<HTMLElement>;
  isMobile?: boolean;
}>;

export function HeaderToolbarItem({
  icon,
  title,
  href,
  target,
  onClick,
  className,
  isMobile,
  ...rest
}: HeaderToolbarItemProps) {
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
      className={className}
      icon={icon}
      href={href}
      target={target}
      tooltip={{ title }}
      onClick={onClick}
      {...extractSupportProps(rest)}
    />
  );
}
