import { useEffect, useMemo } from 'react';

import { FieldDecorator } from '@snack-uikit/fields';
import { ToggleGroup } from '@snack-uikit/toggles';

import { FormValues } from '../../../types';
import { parseKeyToDataTest } from '../../../utils';
import { CONTROL } from '../constants';
import { BaseControlWithItems } from '../types';
import { SegmentedControlCard, SegmentedControlItem } from './SegmentedControlCard';
import styles from './styles.module.scss';

type UiProps = { className?: string; disabled?: boolean };

export type SegmentedControl = {
  type: typeof CONTROL.Segmented;
  defaultValue?: string;
} & BaseControlWithItems<SegmentedControlItem, UiProps>;

export type SegmentedControlUiProps = SegmentedControl & {
  value?: string;
  onChange?(value?: string): void;
  watchedValues?: FormValues;
};

export function SegmentedControlUi({
  decoratorProps,
  uiProps,
  value,
  onChange,
  items: itemsProp,
  relateFn,
  watchedValues,
  accessorKey,
}: SegmentedControlUiProps) {
  const {
    items: relatedItems,
    decoratorProps: relatedDecoratorProps,
    uiProps: relatedUiProps,
  } = useMemo(() => relateFn?.(watchedValues ?? {}) ?? {}, [relateFn, watchedValues]);

  const items = useMemo(() => relatedItems ?? itemsProp, [itemsProp, relatedItems]);

  const dataTestAttribute = parseKeyToDataTest('segmented', accessorKey);

  useEffect(() => {
    if (!items.find(item => String(item?.value) === String(value))) {
      onChange?.(String(items?.[0]?.value));
    }
  }, [value, onChange, items, relatedItems]);

  const visible = relatedUiProps?.visible ?? uiProps?.visible ?? true;

  if (!visible) {
    return null;
  }

  return (
    <FieldDecorator {...decoratorProps} {...relatedDecoratorProps} size='m' data-test-id={dataTestAttribute}>
      <ToggleGroup
        selectionMode='single'
        value={value}
        onChange={value => {
          value && onChange?.(value);
        }}
      >
        <div className={styles.container}>
          {items.map(item => (
            <SegmentedControlCard
              disabled={relatedUiProps?.disabled ?? uiProps?.disabled}
              {...item}
              key={item?.value}
            />
          ))}
        </div>
      </ToggleGroup>
    </FieldDecorator>
  );
}
