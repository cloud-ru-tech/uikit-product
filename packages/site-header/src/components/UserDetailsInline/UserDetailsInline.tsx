import cn from 'classnames';

import { ExitSVG } from '@cloud-ru/uikit-product-icons';
import { ButtonFunction } from '@snack-uikit/button';
import { Divider } from '@snack-uikit/divider';

import { UserInfo } from '../../helperComponents/UserInfo';
import styles from './styles.module.scss';

export type UserDetailsInlineProps = {
  userName: string;
  lastName: string;
  className?: string;
  onClickExit: () => void;
  withDivider?: boolean;
};

export function UserDetailsInline({ userName, lastName, onClickExit, withDivider, className }: UserDetailsInlineProps) {
  return (
    <div className={cn(styles.userAuthContent, className)}>
      <UserInfo userName={userName} lastName={lastName} />
      {withDivider && <Divider />}
      <ButtonFunction
        label='Выйти из аккаунта'
        size='xs'
        appearance='neutral'
        icon={<ExitSVG size={24} />}
        iconPosition='before'
        className={styles.buttonExit}
        onClick={onClickExit}
      />
    </div>
  );
}
