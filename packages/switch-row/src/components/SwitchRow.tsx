import cn from 'classnames';
import { KeyboardEventHandler, ReactNode } from 'react';

import { extractSupportProps } from '@cloud-ru/uikit-product-utils';
import { Switch } from '@snack-uikit/toggles';
import { Tooltip } from '@snack-uikit/tooltip';

import { SWITCH_ROW_TYPES } from '../constants';
import { Title } from '../helperComponents';
import { SwitchRowType } from '../types';
import styles from './styles.module.scss';

export type SwitchRowProps = {
  title: string;
  description?: string;
  checked: boolean;
  disabled?: boolean;
  loading?: boolean;
  onChange(checked: boolean): void;
  tip?: ReactNode;
  disabledToggleTip?: ReactNode;
  className?: string;
  disableTitleTruncate?: boolean;
  type?: SwitchRowType;
  name?: string;
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
  loading,
  disableTitleTruncate = false,
  type = SWITCH_ROW_TYPES.Block,
  name,
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
      data-test-id='switch-row__switch'
      size='m'
      checked={checked}
      disabled={disabled}
      data-pointer
      showIcon
      tabIndex={-1}
      loading={loading}
      name={name}
    />
  );

  const titleLayout = (
    <div className={styles.titleLayout}>
      <div className={styles.titleWrapper}>
        <Title title={title} tip={tip} disableTitleTruncate={disableTitleTruncate} />
      </div>
    </div>
  );

  return (
    <div
      className={cn(styles.switchRow, className)}
      role='switch'
      aria-checked={checked}
      tabIndex={disabled ? -1 : 0}
      onClick={handleChange}
      onKeyDown={handleKeyDown}
      data-type={type}
      data-disabled={disabled || undefined}
      data-loading={loading || undefined}
      data-checked={checked || undefined}
      {...extractSupportProps(rest)}
    >
      <div className={styles.headline} data-test-id='switch-row__title'>
        {type === SWITCH_ROW_TYPES.Block && titleLayout}

        {disabled && disabledToggleTip ? (
          <Tooltip
            tip={disabledToggleTip}
            data-test-id='switch-row__toggle-tooltip'
            triggerClassName={styles.switchRowWrapper}
          >
            {toggle}
          </Tooltip>
        ) : (
          toggle
        )}

        {type === SWITCH_ROW_TYPES.Line && titleLayout}
      </div>

      {description && (
        <div className={styles.description} data-test-id='switch-row__description'>
          {description}
        </div>
      )}
    </div>
  );
}
