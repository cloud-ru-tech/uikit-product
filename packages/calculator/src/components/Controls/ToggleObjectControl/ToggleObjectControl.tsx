import { useEffect, useMemo, useRef, useState } from 'react';

import { MobileAccordionPrimary } from '@cloud-ru/uikit-product-mobile-accordion';
import { Divider } from '@snack-uikit/divider';
import { Switch } from '@snack-uikit/toggles';

import { ProductContext, useCalculatorContext, useProductContext } from '../../../contexts';
import { FormValues } from '../../../types';
import { getValue, setValue } from '../../../utils';
import { CONTROL } from '../constants';
import { Control } from '../Control';
import { ObjectDecorator } from '../ObjectDecorator';
import { BaseControl, FormControl } from '../types';
import styles from './styles.module.scss';

type UiProps = {
  disabled?: boolean;
};

export type ToggleObjectControl = {
  type: typeof CONTROL.ToggleObject;
  /**
   * Поле, для значения вкл/выкл контрола
   *
   * @example 'eipIsNeeded'
   */
  switchKey: string;
  /** Значение переключателя по умолчанию (true — открыт/включён по умолчанию) */
  defaultSwitchValue?: boolean;
  /** Конфигурация тела аккордеона */
  control: FormControl;
  /** Автоматически выключает переключатель, если массив по этому пути пуст */
  switchOffWhenEmptyAccessorKey?: string;

  onChangeFn?: never;
} & Pick<
  BaseControl<UiProps>,
  'decoratorProps' | 'uiProps' | 'watchedControls' | 'relateFn' | 'onChangePeriod' | 'canChangeWholePricePeriod'
>;

type ToggleObjectControlUiProps = ToggleObjectControl & {
  value: FormValues;
  onChange(value: FormValues): void;
  watchedValues?: FormValues;
};

const ACCORDION_BLOCK_ID = 'key';

export function ToggleObjectControlUi({
  decoratorProps,
  control,
  switchKey,
  switchOffWhenEmptyAccessorKey,
  relateFn,
  watchedValues,
  uiProps,
}: ToggleObjectControlUiProps) {
  const { value: valueProp, onChange: onChangeProp } = useProductContext();
  const switchValue: boolean = getValue(valueProp, switchKey);
  const [expanded, setExpanded] = useState<string | undefined>(() => (switchValue ? ACCORDION_BLOCK_ID : undefined));
  const previousSwitchValue = useRef(switchValue);
  const linkedArrayValue = switchOffWhenEmptyAccessorKey
    ? getValue(valueProp, switchOffWhenEmptyAccessorKey)
    : undefined;
  const shouldSwitchOff = Array.isArray(linkedArrayValue) && linkedArrayValue.length === 0;

  useEffect(() => {
    if (!previousSwitchValue.current && switchValue) {
      setExpanded(ACCORDION_BLOCK_ID);
    }
    previousSwitchValue.current = switchValue;
  }, [switchValue]);

  useEffect(() => {
    if (!shouldSwitchOff || !switchValue) {
      return;
    }

    setValue(valueProp, switchKey, false);
    onChangeProp({ ...valueProp });
  }, [onChangeProp, shouldSwitchOff, switchKey, switchValue, valueProp]);

  const { onAnalyticsClick } = useCalculatorContext();

  const { decoratorProps: relatedDecoratorProps, uiProps: relatedUiProps } = useMemo(
    () => relateFn?.(watchedValues ?? {}) ?? {},
    [relateFn, watchedValues],
  );
  const value: boolean = switchValue;
  const onChange = (newValue: boolean) => {
    setValue(valueProp, switchKey, newValue);
    onChangeProp({ ...valueProp });
  };

  const AdaptiveAccordionPrimary = MobileAccordionPrimary;

  const visible = relatedUiProps?.visible ?? uiProps?.visible ?? true;

  if (!visible) {
    return null;
  }

  return (
    <>
      <AdaptiveAccordionPrimary selectionMode='single' expanded={expanded} onExpandedChange={setExpanded}>
        <AdaptiveAccordionPrimary.CollapseBlock
          outline
          id={ACCORDION_BLOCK_ID}
          header={<ObjectDecorator {...decoratorProps} {...relatedDecoratorProps} />}
          actions={
            <Switch
              showIcon={false}
              checked={value}
              onChange={checked => {
                onAnalyticsClick(String(checked), `toggle-object-control-ui`);
                onChange(checked);
                checked && setExpanded(ACCORDION_BLOCK_ID);
              }}
            />
          }
        >
          <div className={styles.content}>
            <Divider />
            <ProductContext.Provider
              value={{
                value: valueProp,
                onChange: newValue => {
                  setValue(newValue, switchKey, true);
                  onChangeProp({ ...newValue });
                },
              }}
            >
              <Control formControl={{ ...control, accessorKey: '' }} />
            </ProductContext.Provider>
          </div>
        </AdaptiveAccordionPrimary.CollapseBlock>
      </AdaptiveAccordionPrimary>
    </>
  );
}
