import cn from 'classnames';

import { ActionView } from './ActionView';
import { hasVisibleActions } from './helpers';
import styles from './styles.module.scss';
import { ActionsProps } from './types';

export function DesktopActions({ items }: Pick<ActionsProps, 'items'>) {
  if (!hasVisibleActions(items)) {
    return null;
  }

  return (
    <div className={styles.desktopActionsWrapper}>
      {items.map((action, index) => (
        <ActionView {...action} key={index} layoutType='desktop' className={cn(styles.button, action.className)} />
      ))}
    </div>
  );
}
