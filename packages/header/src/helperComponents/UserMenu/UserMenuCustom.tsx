import { useState } from 'react';

import { UserMenuDroplist } from './components';
import styles from './styles.module.scss';
import { CustomUserMenuProps } from './types';

export function UserMenuCustom({ customMenuItems, ...rest }: CustomUserMenuProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <div className={styles.userMenuWrap}>
      <UserMenuDroplist {...rest} isOpen={isUserMenuOpen} setIsOpen={setIsUserMenuOpen} items={customMenuItems} />
    </div>
  );
}
