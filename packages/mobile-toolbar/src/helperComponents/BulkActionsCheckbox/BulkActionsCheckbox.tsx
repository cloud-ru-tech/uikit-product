import { KeyboardEvent, useCallback } from 'react';

import { Checkbox } from '@snack-uikit/toggles';

import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

export type BulkActionsCheckboxProps = {
  onCheck?: () => void;
  checked?: boolean;
  indeterminate?: boolean;
};

export function BulkActionsCheckbox({ onCheck, checked, indeterminate }: BulkActionsCheckboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === ' ' || e.key === 'Enter') {
        onCheck?.();
      }
    },
    [onCheck],
  );

  return (
    <div
      className={styles.checkboxWrapper}
      onClick={onCheck}
      tabIndex={0}
      role='checkbox'
      aria-checked={checked}
      onKeyDown={handleKeyDown}
      data-test-id={TEST_IDS.checkbox}
    >
      <Checkbox size='s' checked={checked} indeterminate={indeterminate} tabIndex={-1} />
    </div>
  );
}
