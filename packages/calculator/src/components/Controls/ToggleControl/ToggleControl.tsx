import { useMemo } from 'react';

import { FormValues } from '../../../types';
import { CONTROL } from '../constants';
import { BaseControl } from '../types';
import { SwitchRow, SwitchRowProps } from './components';

type UiProps = Pick<SwitchRowProps, 'className' | 'disabled' | 'description'>;

export type ToggleControl = {
  type: typeof CONTROL.Toggle;
  defaultValue?: boolean;
} & BaseControl<UiProps>;

export type ToggleControlUiProps = ToggleControl & {
  value?: boolean;
  onChange?(value: boolean): void;
  watchedValues?: FormValues;
};

const noop = () => {};

export function ToggleControlUi({
  decoratorProps,
  uiProps,
  value,
  onChange,
  watchedValues,
  relateFn,
}: ToggleControlUiProps) {
  const { decoratorProps: relatedDecoratorProps, uiProps: relatedUiProps } = useMemo(
    () => relateFn?.(watchedValues ?? {}) ?? {},
    [relateFn, watchedValues],
  );

  const visible = relatedUiProps?.visible ?? uiProps?.visible ?? true;

  if (!visible) {
    return null;
  }

  return (
    <SwitchRow
      checked={value || false}
      onChange={onChange ?? noop}
      {...decoratorProps}
      {...relatedDecoratorProps}
      {...uiProps}
      {...relatedUiProps}
    />
  );
}
