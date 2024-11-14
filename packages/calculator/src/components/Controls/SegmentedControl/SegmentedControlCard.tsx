import { ReactNode } from 'react';

import { ChipToggle } from '@snack-uikit/chips';
import { useToggleGroup } from '@snack-uikit/toggles';
import { Tooltip } from '@snack-uikit/tooltip';

export type SegmentedControlItem = {
  value: string;

  label?: string;
  description?: string;

  disabled?: boolean;
  disabledReason?: ReactNode;

  dataTestId?: string;
};

export function SegmentedControlCard({ value, label, disabled, disabledReason, dataTestId }: SegmentedControlItem) {
  const { isChecked, handleClick } = useToggleGroup({ value });

  return (
    <Tooltip open={disabled && disabled && disabledReason ? undefined : false} tip={disabledReason}>
      <ChipToggle
        size='m'
        checked={isChecked}
        onChange={handleClick}
        disabled={!isChecked && disabled}
        data-test-id={dataTestId}
        label={label ?? value}
      />
    </Tooltip>
  );
}
