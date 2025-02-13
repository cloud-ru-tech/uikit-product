import { ReactNode, useEffect, useMemo } from 'react';

import { AdaptiveFieldSelect } from '@sbercloud/uikit-product-mobile-fields';
import { BaseOptionProps, FieldSelectSingleProps } from '@snack-uikit/fields';

import { useCalculatorContext } from '../../../contexts';
import { FormValues, PRICE_PERIOD } from '../../../types';
import { CONTROL } from '../constants';
import { BaseControlWithItems } from '../types';
import styles from './styles.module.scss';

export type SelectControlItem = {
  value: string;
  label?: string;
  description?: string;
  icon?: ReactNode;
  disabled?: boolean;
  disabledReason?: ReactNode;
  dataTestId?: string;
  onChangePeriod?: (value: PRICE_PERIOD) => void;
  canChangeWholePricePeriod?: boolean;
};

type SelectUiProps = Pick<
  FieldSelectSingleProps,
  | 'placeholder'
  | 'className'
  | 'readonly'
  | 'showClearButton'
  | 'showCopyButton'
  | 'caption'
  | 'showHintIcon'
  | 'searchable'
  | 'noDataState'
  | 'noResultsState'
  | 'disabled'
>;

type SelectControl = BaseControlWithItems<SelectControlItem, SelectUiProps>;

export type SelectSingleControl = SelectControl & { type: typeof CONTROL.SelectSingle } & {
  defaultValue?: string;
};

type SelectSingleUiProps = SelectSingleControl & {
  value?: string;
  onChange?(value?: string): void;
  watchedValues?: FormValues;
};

export type SelectMultipleControl = SelectControl & { type: typeof CONTROL.SelectMultiple } & {
  defaultValue?: string[];
};

type SelectMultipleUiProps = SelectMultipleControl & {
  value?: string[];
  onChange?(value?: string[]): void;
  watchedValues?: FormValues;
};

function convertItemsToOptions(items: SelectControlItem[]): BaseOptionProps[] {
  return items.map(item => ({
    value: item.value,
    disabled: item.disabled,
    option: item.label ?? item.value,
    beforeContent: item.icon,
  }));
}

export function SelectSingleUi({
  decoratorProps,
  uiProps,
  value,
  onChange,
  items: itemsProp,
  watchedValues,
  relateFn,
}: SelectSingleUiProps) {
  const { layoutType } = useCalculatorContext();

  const {
    items: relatedItems,
    decoratorProps: relatedDecoratorProps,
    uiProps: relatedUiProps,
  } = useMemo(() => relateFn?.(watchedValues ?? {}) ?? {}, [relateFn, watchedValues]);

  const items = useMemo(() => relatedItems ?? itemsProp, [itemsProp, relatedItems]);

  useEffect(() => {
    if (!items.find(item => String(item.value) === String(value))) {
      onChange?.(String(items?.[0]?.value));
    }
  }, [value, onChange, items, relatedItems]);

  const visible = relatedUiProps?.visible ?? uiProps?.visible ?? true;

  if (!visible) {
    return null;
  }

  return (
    <div>
      {!decoratorProps.label && <div className={styles.zeroLabel} />}
      <AdaptiveFieldSelect
        searchable={false}
        showClearButton={false}
        layoutType={layoutType}
        widthStrategy='eq'
        {...decoratorProps}
        {...relatedDecoratorProps}
        size='m'
        selection='single'
        value={value}
        onChange={onChange}
        options={convertItemsToOptions(items)}
        {...uiProps}
        {...relatedUiProps}
      />
    </div>
  );
}

export function SelectMultipleUi({
  decoratorProps,
  uiProps,
  value,
  onChange,
  items: itemsProp,
  relateFn,
  watchedValues,
}: SelectMultipleUiProps) {
  const { layoutType } = useCalculatorContext();

  const {
    items: relatedItems,
    decoratorProps: relatedDecoratorProps,
    uiProps: relatedUiProps,
  } = useMemo(() => relateFn?.(watchedValues ?? {}) ?? {}, [relateFn, watchedValues]);

  const items = useMemo(() => relatedItems ?? itemsProp, [itemsProp, relatedItems]);

  const visible = relatedUiProps?.visible ?? uiProps?.visible ?? true;

  if (!visible) {
    return null;
  }

  return (
    <div>
      {!decoratorProps.label && <div className={styles.zeroLabel} />}
      <AdaptiveFieldSelect
        layoutType={layoutType}
        searchable={false}
        showClearButton={false}
        {...decoratorProps}
        {...relatedDecoratorProps}
        selection='multiple'
        size='m'
        value={value}
        onChange={onChange}
        options={convertItemsToOptions(items)}
        {...uiProps}
        {...relatedUiProps}
      />
    </div>
  );
}
