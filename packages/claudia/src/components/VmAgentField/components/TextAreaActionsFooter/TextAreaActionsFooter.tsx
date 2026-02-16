import cn from 'classnames';
import { ReactNode } from 'react';

import styles from './styles.module.scss';

type TextAreaActionsFooterProps = {
  left?: ReactNode;
  right?: ReactNode;
};

export function TextAreaActionsFooter({ left, right }: TextAreaActionsFooterProps) {
  return (
    <div className={styles.actionsFooter}>
      <div className={styles.actionsWrapper}>{left}</div>
      <div className={cn(styles.actionsWrapper, styles.right)}>{right}</div>
    </div>
  );
}
