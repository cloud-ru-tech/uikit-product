import { useMemo, useState } from 'react';

import { MobileAccordionPrimary } from '@sbercloud/uikit-product-mobile-accordion';
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
  /** Конфигурация тела аккордеона */
  control: FormControl;

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

export function ToggleObjectControlUi({
  decoratorProps,
  control,
  switchKey,
  relateFn,
  watchedValues,
  uiProps,
}: ToggleObjectControlUiProps) {
  const [expanded, setExpanded] = useState<string | undefined>(undefined);

  const { value: valueProp, onChange: onChangeProp } = useProductContext();
  const { onAnalyticsClick } = useCalculatorContext();

  const { decoratorProps: relatedDecoratorProps, uiProps: relatedUiProps } = useMemo(
    () => relateFn?.(watchedValues ?? {}) ?? {},
    [relateFn, watchedValues],
  );
  const value: boolean = getValue(valueProp, switchKey);
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
          id='key'
          header={<ObjectDecorator {...decoratorProps} {...relatedDecoratorProps} />}
          actions={
            <Switch
              showIcon={false}
              checked={value}
              onChange={checked => {
                onAnalyticsClick(String(checked), `toggle-object-control-ui`);
                onChange(checked);
                checked && setExpanded('key');
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
