import { ReactNode } from 'react';

import { Card } from '@snack-uikit/card';
import { useToggleGroup } from '@snack-uikit/toggles';
import { Tooltip } from '@snack-uikit/tooltip';

import styles from './styles.module.scss';

export type ToggleCardItem = {
  value: string;

  label?: string;
  description?: ReactNode;

  disabled?: boolean;
  disabledReason?: ReactNode;

  dataTestId?: string;
};

export function ToggleCard({ value, label, description, disabled, disabledReason, dataTestId }: ToggleCardItem) {
  const { isChecked, handleClick } = useToggleGroup({ value });

  return (
    <Tooltip open={disabled && disabled ? undefined : false} tip={disabledReason}>
      <Card
        outline
        checked={isChecked}
        onClick={handleClick}
        className={styles.card}
        disabled={disabled}
        data-test-id={dataTestId}
        size='s'
      >
        <Card.Header
          title={label ?? value}
          description={description as string}
          truncate={{
            title: 10,
            description: 20,
          }}
        />
      </Card>
    </Tooltip>
  );
}
