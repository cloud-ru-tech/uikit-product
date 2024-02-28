import cn from 'classnames';
import { ReactNode } from 'react';

import { extractSupportProps } from '@sbercloud/uikit-product-utils';
import { Switch } from '@snack-uikit/toggles';
import { QuestionTooltip, Tooltip } from '@snack-uikit/tooltip';
import { TruncateString } from '@snack-uikit/truncate-string';

import styles from './styles.module.scss';

export type SwitchRowProps = {
  title: string;
  description?: string;
  checked: boolean;
  disabled?: boolean;
  onChange(checked: boolean): void;
  tip?: ReactNode;
  disabledToggleTip?: ReactNode;
  className?: string;
};

export function SwitchRow({
  title,
  description,
  checked,
  disabled,
  onChange,
  tip,
  className,
  disabledToggleTip,
  ...rest
}: SwitchRowProps) {
  const handleChange = () => !disabled && onChange(!checked);

  const toggle = (
    <Switch
      data-test-id='switch-row__switch'
      size='m'
      checked={checked}
      disabled={disabled}
      data-pointer
      showIcon
      tabIndex={-1}
    />
  );

  return (
    <div
      className={cn(styles.switchRow, className)}
      role='switch'
      aria-checked={checked}
      tabIndex={disabled ? -1 : 0}
      onClick={handleChange}
      onKeyDown={e => {
        if (!disabled && (e.code === 'Enter' || e.code === 'Space')) {
          handleChange();
        }
      }}
      data-disabled={disabled || undefined}
      data-checked={checked || undefined}
      {...extractSupportProps(rest)}
    >
      <div className={styles.headline} data-test-id='switch-row__title'>
        <div className={styles.titleLayout}>
          <TruncateString text={title} />

          {tip && (
            <span className={styles.tipWrapper}>
              <QuestionTooltip
                data-pointer
                tip={tip}
                data-test-id='switch-row__title-tooltip'
                size='xs'
                tabIndex={-1}
              />
            </span>
          )}
        </div>

        {disabled && disabledToggleTip ? (
          <Tooltip tip={disabledToggleTip} data-test-id='switch-row__toggle-tooltip' tabIndex={-1}>
            {toggle}
          </Tooltip>
        ) : (
          toggle
        )}
      </div>

      {description && (
        <span className={styles.description} data-test-id='switch-row__description'>
          {description}
        </span>
      )}
    </div>
  );
}
