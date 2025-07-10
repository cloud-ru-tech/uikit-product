import { ReactNode, useMemo } from 'react';

import { ChipToggle, ChipToggleProps } from '@snack-uikit/chips';
import { StatusIndicator } from '@snack-uikit/status';
import { Tooltip } from '@snack-uikit/tooltip';
import { WithSupportProps } from '@snack-uikit/utils';

import styles from './styles.module.scss';

export type ChipsToggleIndicatorProps = WithSupportProps<
  Pick<ChipToggleProps, 'label' | 'onChange' | 'checked' | 'className' | 'disabled'> & {
    available?: boolean;
    availableTip?: ReactNode;
    disabledTip?: ReactNode;
  }
>;

export function ChipsToggleIndicator({
  available,
  availableTip,
  disabledTip,
  disabled,
  ...props
}: ChipsToggleIndicatorProps) {
  const tipConfig = useMemo(() => {
    const isOpen = (available && availableTip) || (disabled && disabledTip);

    return {
      tip: disabled ? disabledTip : availableTip,
      open: isOpen ? undefined : false,
      hoverDelayOpen: disabled ? 100 : 400,
    };
  }, [available, availableTip, disabled, disabledTip]);

  return (
    <Tooltip {...tipConfig}>
      <ChipToggle
        {...props}
        className={styles.chipsToggleIndicator}
        icon={available ? <StatusIndicator size='xs' appearance='primary' /> : undefined}
        size='s'
        disabled={disabled}
      />
    </Tooltip>
  );
}
