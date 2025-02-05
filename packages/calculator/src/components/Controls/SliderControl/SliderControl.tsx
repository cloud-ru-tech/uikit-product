import { useMemo } from 'react';

import { FieldSlider, FieldSliderProps } from '@snack-uikit/fields';

import { FormValues } from '../../../types';
import { CONTROL } from '../constants';
import { BaseControlWithItems } from '../types';

type SliderUiProps = Pick<
  FieldSliderProps,
  'step' | 'className' | 'showScaleBar' | 'tipFormatter' | 'postfixIcon' | 'disabled'
>;

export type SliderControl = {
  type: typeof CONTROL.Slider;
  defaultValue?: string;
  accessorKey?: string;
} & BaseControlWithItems<number, SliderUiProps>;

export type SliderControlUiProps = SliderControl & {
  onChange?(value: string): void;
  watchedValues?: FormValues;
};

export function SliderControlUi({
  decoratorProps,
  uiProps,
  onChange,
  items: itemsProp,
  watchedValues,
  relateFn,
}: SliderControlUiProps) {
  const {
    items: relatedItems,
    decoratorProps: relatedDecoratorProps,
    uiProps: relatedUiProps,
  } = useMemo(() => relateFn?.(watchedValues ?? {}) ?? {}, [relateFn, watchedValues]);

  const items = useMemo(() => relatedItems ?? itemsProp, [itemsProp, relatedItems]);

  const { marks } = useMemo(() => {
    const marks = items
      .sort((a, b) => a - b)
      .reduce(
        (res, item, idx) => {
          res[idx + 1] = item;
          return res;
        },
        {} as FieldSliderProps['marks'],
      );

    return { marks };
  }, [items]);

  const textInputValueFormatter = (value: number): string => String(marks[value]);

  const visible = relatedUiProps?.visible ?? uiProps?.visible ?? true;

  if (!visible) {
    return null;
  }

  return (
    <FieldSlider
      range={false}
      size='m'
      onChange={newValue => {
        const valueByKey = String(marks[newValue as number]);
        onChange?.(valueByKey);
      }}
      marks={marks}
      min={1}
      max={items.length}
      step={null}
      textInputFormatter={textInputValueFormatter}
      {...uiProps}
      {...relatedUiProps}
      {...decoratorProps}
      {...relatedDecoratorProps}
    />
  );
}
