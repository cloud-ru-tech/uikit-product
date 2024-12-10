import cn from 'classnames';
import { Dispatch, SetStateAction } from 'react';

import { Typography } from '@snack-uikit/typography';

import styles from './styles.modules.scss';

export function Menu({
  items,
  activeMenuItem,
  setActiveMenuItem,
  setIsModalMenuOpen,
  onClick,
  className = '',
}: {
  items: { id: string; title: string; link?: string; target?: string }[];
  activeMenuItem: string | null;
  setActiveMenuItem: Dispatch<SetStateAction<string | null>>;
  setIsModalMenuOpen: Dispatch<SetStateAction<boolean>>;
  onClick(): void;
  className?: string;
}) {
  const onMenuItemClickHandler = (id?: string) => {
    if (id && activeMenuItem !== id) {
      setIsModalMenuOpen(true);
      setActiveMenuItem(id);
    } else {
      setIsModalMenuOpen(false);
      setActiveMenuItem(null);
    }

    onClick();
  };

  return (
    <nav className={className} data-qa='header_nav'>
      <ul className={styles.menu} data-qa='header_nav_list'>
        {items.map(({ title, id, link, target }, index) => {
          if (link) {
            return (
              <a
                className={cn(styles.menuItem, 'header-mainMenu', 'link')}
                href={link}
                onClick={() => onMenuItemClickHandler()}
                key={id + index}
                id={`layout-header-link-${title}`}
                target={target}
              >
                <Typography.SansTitleS tag='span'>{title}</Typography.SansTitleS>
              </a>
            );
          }
          return (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <li
              key={index}
              className={cn(styles.menuItem, 'header-mainMenu', {
                [styles.menuItemActive]: activeMenuItem === id,
              })}
              id={`layout-header-item-${title}`}
              data-click='allclicks'
              onClick={() => {
                onMenuItemClickHandler(id);
              }}
              data-qa='header_nav_item'
            >
              <Typography.SansTitleS tag='span'>{title}</Typography.SansTitleS>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
