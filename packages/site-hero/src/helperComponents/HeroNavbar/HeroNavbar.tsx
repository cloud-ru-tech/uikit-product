import cn from 'classnames';

import { Link, LinkProps } from '@snack-uikit/link';

import styles from './styles.module.scss';

export type HeroNavbarProps = {
  items: LinkProps[];
  className?: string;
};

export function HeroNavbar({ items, className }: HeroNavbarProps) {
  return (
    <div className={cn(styles.heroNavbar, className)}>
      {items.map(item => (
        <Link
          key={item.text}
          {...item}
          className={cn(styles.heroNavbarItem, item.className)}
          size='l'
          appearance='neutral'
        />
      ))}
    </div>
  );
}
