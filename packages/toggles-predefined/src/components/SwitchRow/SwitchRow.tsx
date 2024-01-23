import cn from 'classnames';
import { ReactNode, useMemo } from 'react';

import { extractSupportProps } from '@sbercloud/uikit-product-utils';
import { Switch } from '@snack-uikit/toggles';
import { QuestionTooltip, Tooltip } from '@snack-uikit/tooltip';
import { Typography } from '@snack-uikit/typography';

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
  const titleContent = useMemo(
    () => (
      <>
        <Typography.SansLabelL> {title}</Typography.SansLabelL>

        {tip && <QuestionTooltip data-pointer tip={tip} data-test-id='switch-row__title-tooltip' size='s' />}
      </>
    ),
    [tip, title],
  );

  const toggle = (
    <Switch data-test-id='switch-row__switch' size='m' checked={checked} disabled={disabled} data-pointer />
  );

  const handleChange = () => !disabled && onChange(!checked);

  return (
    <div
      className={cn(styles.switchRow, className)}
      role='switch'
      aria-checked={checked}
      tabIndex={0}
      onClick={handleChange}
      data-disabled={disabled || undefined}
      data-checked={checked || undefined}
      {...extractSupportProps(rest)}
    >
      <div>
        <div className={styles.headline} data-test-id='switch-row__title'>
          {titleContent}
        </div>

        {description && (
          <Typography.SansBodyM className={styles.description} data-test-id='switch-row__description'>
            {description}
          </Typography.SansBodyM>
        )}
      </div>

      {disabled && disabledToggleTip ? (
        <Tooltip tip={disabledToggleTip} data-test-id='switch-row__toggle-tooltip'>
          {toggle}
        </Tooltip>
      ) : (
        toggle
      )}
    </div>
  );
}
