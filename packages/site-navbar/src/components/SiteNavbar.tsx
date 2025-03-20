import cn from 'classnames';
import ScrollContainer from 'react-indiana-drag-scroll';

import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { Divider } from '@snack-uikit/divider';

import { NavbarItem, NavbarItemProps } from '../helperComponents';
import styles from './styles.module.scss';

export type SiteNavbarProps = WithSupportProps<{
  items: NavbarItemProps[];
  onItemClick(id: string, text: string): void;
  active?: string;
  className?: string;
}>;

export function SiteNavbar({ items, className, onItemClick, active, ...rest }: SiteNavbarProps) {
  return (
    <div className={cn(styles.navbar, className)} {...extractSupportProps(rest)}>
      <Divider />
      <ScrollContainer className={styles.navbarItemsWrapper}>
        {items.map(item => (
          <NavbarItem key={item.id} {...item} active={active === item.id} onClick={onItemClick} />
        ))}
      </ScrollContainer>
    </div>
  );
}
