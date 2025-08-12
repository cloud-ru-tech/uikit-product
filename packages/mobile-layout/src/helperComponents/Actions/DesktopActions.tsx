import cn from 'classnames';

import { ActionView } from './ActionView';
import styles from './styles.module.scss';
import { ActionsProps } from './types';

export function DesktopActions({ items }: Pick<ActionsProps, 'items'>) {
  return (
    <div className={styles.desktopActionsWrapper}>
      {items.map((action, index) => (
        <ActionView {...action} key={index} layoutType='desktop' className={cn(styles.button, action.className)} />
      ))}
    </div>
  );
}
