import { ReactNode } from 'react';

import { Popover } from '@snack-uikit/popover';

import styles from './styles.module.scss';

type ConditionalPopoverProps = {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  tip: ReactNode;
  withPopover?: boolean;
  children: ReactNode;
};

export function ConditionalPopover({ tip, withPopover, isOpen, onOpenChange, children }: ConditionalPopoverProps) {
  if (withPopover) {
    return (
      <Popover
        className={styles.popover}
        open={isOpen}
        onOpenChange={() => {
          if (!open) onOpenChange(false);
        }}
        tip={tip}
        trigger={'click'}
        placement={'bottom-start'}
      >
        {children}
      </Popover>
    );
  }

  return children;
}
