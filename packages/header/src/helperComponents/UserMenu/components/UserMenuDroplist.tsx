import { useRef } from 'react';

import { Avatar } from '@snack-uikit/avatar';
import { Counter } from '@snack-uikit/counter';
import { Droplist, DroplistProps } from '@snack-uikit/list';

import styles from '../styles.module.scss';
import { CommonUserMenuProps } from '../types';
import { getPatchedListItems } from '../utils';

type UserMenuDroplistProps = Pick<CommonUserMenuProps, 'user' | 'indicator' | 'onAvatarClick'> &
  Pick<DroplistProps, 'items' | 'selection'> & { count?: number; isOpen: boolean; setIsOpen: (open: boolean) => void };

export function UserMenuDroplist({
  user,
  indicator,
  onAvatarClick,
  count,
  items,
  selection,
  isOpen,
  setIsOpen,
}: UserMenuDroplistProps) {
  const closeUserMenu = () => setIsOpen(false);

  const patchedItems = getPatchedListItems({ items, callback: closeUserMenu });

  const triggerRef = useRef<HTMLDivElement>(null);

  return (
    <Droplist
      size='s'
      open={isOpen}
      onOpenChange={setIsOpen}
      placement='bottom-end'
      items={patchedItems}
      selection={selection}
      triggerElemRef={triggerRef}
      trigger='click'
      className={styles.userMenuDroplist}
    >
      <div
        className={styles.userMenu}
        role='button'
        tabIndex={0}
        data-test-id='header__user-menu__button'
        ref={triggerRef}
        onClick={onAvatarClick}
      >
        <Avatar size='xs' name={user.name} showTwoSymbols indicator={indicator} />

        {(count ?? 0) > 0 && (
          <Counter value={count ?? 0} appearance='primary' size='s' className={styles.userMenuAvatarCounter} />
        )}
      </div>
    </Droplist>
  );
}
