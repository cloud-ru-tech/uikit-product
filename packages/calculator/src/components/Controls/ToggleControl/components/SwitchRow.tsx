import cn from 'classnames';
import { KeyboardEventHandler, ReactNode } from 'react';

import { extractSupportProps } from '@sbercloud/uikit-product-utils';
import { Switch } from '@snack-uikit/toggles';
import { Tooltip } from '@snack-uikit/tooltip';

import { parseKeyToDataTest } from '../../../../utils';
import { ObjectDecorator } from '../../ObjectDecorator';
import { TooltipPlacement } from '../../types';
import styles from './styles.module.scss';

export type SwitchRowProps = {
  label?: string;
  description?: string;
  checked: boolean;
  disabled?: boolean;
  loading?: boolean;
  onChange(checked: boolean): void;
  labelTooltip?: ReactNode;
  tooltipPlacement?: TooltipPlacement;
  disabledToggleTip?: ReactNode;
  className?: string;
  disableTitleTruncate?: boolean;
  dataTestId: string;
};

export function SwitchRow({
  label,
  description,
  checked,
  disabled,
  onChange,
  labelTooltip,
  tooltipPlacement,
  className,
  disabledToggleTip,
  loading,
  dataTestId,
  ...rest
}: SwitchRowProps) {
  const handleChange = () => !disabled && onChange(!checked);

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = e => {
    if (e.code === 'Enter' || e.code === 'Space') {
      handleChange();
    }
  };

  const toggle = (
    <Switch
      size='m'
      checked={checked}
      disabled={disabled}
      data-pointer
      showIcon={false}
      tabIndex={-1}
      loading={loading}
    />
  );

  return (
    <div
      className={cn(styles.switchRow, className)}
      role='switch'
      aria-checked={checked}
      tabIndex={disabled ? -1 : 0}
      onClick={handleChange}
      onKeyDown={handleKeyDown}
      data-disabled={disabled || undefined}
      data-loading={loading || undefined}
      data-checked={checked || undefined}
      data-mobile
      data-test-id={dataTestId}
      {...extractSupportProps(rest)}
    >
      <div className={styles.headline}>
        <div className={styles.titleLayout}>
          <div className={styles.titleWrapper} data-test-id={parseKeyToDataTest('toggle', 'title')}>
            <ObjectDecorator label={label} labelTooltip={labelTooltip} tooltipPlacement={tooltipPlacement} />
          </div>
        </div>

        <div className={styles.wrap}>
          {disabled && disabledToggleTip ? (
            <Tooltip tip={disabledToggleTip} triggerClassName={styles.switchRowWrapper}>
              {toggle}
            </Tooltip>
          ) : (
            toggle
          )}
        </div>
      </div>

      {description && <span className={styles.description}>{description}</span>}
    </div>
  );
}
