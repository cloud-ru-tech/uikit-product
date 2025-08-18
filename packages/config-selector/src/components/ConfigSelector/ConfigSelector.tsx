import cn from 'classnames';
import { ChangeEvent, ChangeEventHandler, ReactNode, useMemo } from 'react';

import { Tooltip } from '@snack-uikit/tooltip';
import { TruncateString } from '@snack-uikit/truncate-string';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import styles from './styles.module.scss';

export type ConfigSelectorProps = WithSupportProps<{
  /** Лейбл */
  label: string;
  /** Колбек смены значения */
  onChange(checked: boolean, e: ChangeEvent<HTMLInputElement>): void;
  /** Отмечен ли компонент */
  checked: boolean;
  /** CSS-класс */
  className?: string;
  /** HTML tab index */
  tabIndex?: number;
  /** Доступна ли опция */
  available?: boolean;
  /** Тултип для доступной опции */
  availableTip?: ReactNode;
  /** Деактивирован ли компонент */
  disabled?: boolean;
  /** Тултип для деактивированного компонента */
  disabledTip?: ReactNode;
}>;

export function ConfigSelector({
  available,
  availableTip,
  disabledTip,
  label,
  checked,
  disabled,
  onChange,
  className,
  tabIndex = 0,
  ...rest
}: ConfigSelectorProps) {
  const tipConfig = useMemo(() => {
    const isOpen = (available && !checked && availableTip) || (disabled && disabledTip);

    return {
      tip: disabled ? disabledTip : availableTip,
      open: isOpen ? undefined : false,
      hoverDelayOpen: disabled ? 100 : 400,
    };
  }, [available, availableTip, checked, disabled, disabledTip]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    if (disabled) {
      return;
    }

    onChange?.(!checked, e);
  };

  return (
    <Tooltip {...tipConfig} disableSpanWrapper>
      <label
        {...extractSupportProps(rest)}
        data-available={available || undefined}
        data-disabled={disabled || undefined}
        data-checked={checked || undefined}
        className={cn(styles.configSelector, className)}
      >
        <input
          type='checkbox'
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          tabIndex={tabIndex}
          className={styles.configSelectorInput}
          data-test-id='config-selector_input'
        />

        <span
          data-available={available || undefined}
          data-disabled={disabled || undefined}
          data-checked={checked || undefined}
          className={styles.configSelectorContent}
        >
          <span className={cn(styles.labelLayout, styles.label)} data-test-id='config-selector_label'>
            <TruncateString text={label} />
          </span>
        </span>
      </label>
    </Tooltip>
  );
}
