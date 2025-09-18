import { Avatar } from '@snack-uikit/avatar';
import { Dropdown } from '@snack-uikit/dropdown';

import { UserDetailsInline } from '../UserDetailsInline';
import styles from './styles.module.scss';

export type UserDetailsDropdownProps = {
  userName: string;
  lastName: string;
  onClickExit: () => void;
  onClickDropdownContent?: () => void;
};

export function UserDetailsDropdown({
  userName,
  lastName,
  onClickExit,
  onClickDropdownContent,
}: UserDetailsDropdownProps) {
  return (
    <Dropdown
      offset={8}
      placement='bottom-end'
      onOpenChange={onClickDropdownContent}
      content={
        <div className={styles.wrapper}>
          <UserDetailsInline
            className={styles.container}
            userName={userName}
            lastName={lastName}
            onClickExit={onClickExit}
            withDivider
          />
        </div>
      }
    >
      <Avatar
        name={`${userName} ${lastName}`}
        size='s'
        showTwoSymbols
        className={styles.authAvatar}
        appearance='green'
      />
    </Dropdown>
  );
}
