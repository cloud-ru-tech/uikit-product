import cn from 'classnames';

import { Avatar } from '@snack-uikit/avatar';
import { Typography } from '@snack-uikit/typography';

import styles from './styles.module.scss';

type UserInfoProps = {
  userName: string;
  lastName: string;
  className?: string;
};

export function UserInfo({ userName, lastName, className }: UserInfoProps) {
  const fullName = `${lastName} ${userName}`;

  return (
    <div className={cn(styles.root, className)}>
      <Avatar name={fullName} size='xs' showTwoSymbols appearance='green' />
      <Typography tag='div' size='s' purpose='body' family='sans' className={styles.text}>
        {fullName}
      </Typography>
    </div>
  );
}
