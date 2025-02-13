import { useEffect, useMemo, useState } from 'react';

import { FieldDecorator, FieldStepper, FieldStepperProps } from '@snack-uikit/fields';

import { FormValues } from '../../../types';
import { parseKeyToDataTest } from '../../../utils';
import { formatNumber } from '../../../utils/formatNumber';
import { CONTROL } from '../constants';
import { BaseControl, WithVisible } from '../types';
import styles from './styles.module.scss';

type StepperUiProps = Pick<
  FieldStepperProps,
  'step' | 'min' | 'max' | 'allowMoreThanLimits' | 'disabled' | 'postfix' | 'size'
> & {
  showHint?: boolean;
  /**
   * Множитель для значения
   * Например: надо реальное значение это 3 млн, а отображать надо как 3
   */
  multiplier?: number;
};

export type StepperControl = {
  type: typeof CONTROL.Stepper;
  defaultValue?: number;
  uiProps: WithVisible<StepperUiProps>;
} & Omit<BaseControl<StepperUiProps>, 'uiProps'>;

export type StepperControlUiProps = StepperControl & {
  value?: number;
  onChange?(value: number): void;
  watchedValues?: FormValues;
};

export function StepperControlUi({
  decoratorProps,
  uiProps,
  value,
  onChange,
  watchedValues,
  relateFn,
  accessorKey,
}: StepperControlUiProps) {
  const [innerValue, setInnerValue] = useState<number>(value ?? 0);

  const dataTestAttribute = parseKeyToDataTest('stepper', accessorKey);

  useEffect(() => {
    setInnerValue(value ?? 0);
  }, [value]);

  const { decoratorProps: relatedDecoratorProps, uiProps: relatedUiProps } = useMemo(
    () => relateFn?.(watchedValues ?? {}) ?? {},
    [relateFn, watchedValues],
  );

  const { min, max, multiplier = 1, step = 1 } = { ...uiProps, ...relatedUiProps };

  useEffect(() => {
    if (min && Number((value ?? 0) / multiplier) < min) {
      onChange?.(min * multiplier);

      return;
    }

    if (max && Number((value ?? 0) / multiplier) > max) {
      onChange?.(max * multiplier);

      return;
    }
  }, [value, onChange, min, max, multiplier]);

  const visible = relatedUiProps?.visible ?? uiProps?.visible ?? true;
  const showHint = relatedUiProps?.showHint ?? uiProps.showHint ?? true;

  const handleValueChange = (rawInnerValue?: number) => {
    const innerValue = Number(rawInnerValue ?? 0);

    if (min && innerValue / multiplier <= min) {
      onChange?.(min * multiplier);
      setInnerValue(min);

      return;
    }

    if (max && innerValue / multiplier >= max) {
      onChange?.(max * multiplier);
      setInnerValue(max);

      return;
    }

    onChange?.(innerValue);
  };

  if (!visible) {
    return null;
  }

  return (
    <FieldDecorator {...decoratorProps} {...relatedDecoratorProps} size='m'>
      <div>
        <FieldStepper
          size='m'
          value={(innerValue ?? 0) / multiplier}
          onChange={value => {
            if (Math.abs(value - innerValue / multiplier) === step) {
              handleValueChange?.(value * multiplier);
              return;
            }

            setInnerValue?.(value * multiplier);
          }}
          onBlur={() => {
            handleValueChange(innerValue);
          }}
          allowMoreThanLimits={false}
          data-test-id={dataTestAttribute}
          {...uiProps}
          {...relatedUiProps}
        />
      </div>

      {showHint && (
        <div className={styles.hintWrapper}>
          <span className={styles.hint}>{formatNumber(min)}</span>
          <span className={styles.hint}>{formatNumber(max)}</span>
        </div>
      )}
    </FieldDecorator>
  );
}
