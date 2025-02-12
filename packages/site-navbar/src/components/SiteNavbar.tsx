import cn from 'classnames';
import { useRef } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { Divider } from '@snack-uikit/divider';

import { NavbarItem, NavbarItemProps } from '../helperComponents';
import styles from './styles.module.scss';

export type SiteNavbarProps = WithSupportProps<{
  items: NavbarItemProps[];
  sticky?: boolean;
  className?: string;
}>;

export function SiteNavbar({ items, className, sticky, ...rest }: SiteNavbarProps) {
  const scrollContainerRef = useRef<HTMLElement>(null);

  return (
    <div data-sticky={sticky || undefined} className={cn(styles.navbar, className)} {...extractSupportProps(rest)}>
      <Divider />
      <ScrollContainer className={styles.navbarItemsWrapper} innerRef={scrollContainerRef}>
        {items.map(item => (
          <NavbarItem key={item.id} {...item} />
        ))}
      </ScrollContainer>
    </div>
  );
}
