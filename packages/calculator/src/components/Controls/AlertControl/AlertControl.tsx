import { useMemo } from 'react';

import { Alert, AlertProps } from '@snack-uikit/alert';

import { FormValues } from '../../../types';
import { parseKeyToDataTest } from '../../../utils';
import { CONTROL } from '../constants';
import { BaseControl, WithVisible } from '../types';

export type AlertControl = Pick<
  BaseControl<AlertProps>,
  'uiProps' | 'accessorKey' | 'watchedControls' | 'onChangePeriod' | 'canChangeWholePricePeriod'
> & {
  type: typeof CONTROL.Alert;
  relateFn?(watchedValues: FormValues):
    | {
        uiProps?: Partial<WithVisible<AlertProps>>;
      }
    | undefined;
  onChangeFn?: never;
};

export type AlertControlUiProps = AlertControl & { watchedValues?: FormValues };

export function AlertControlUi({ uiProps, relateFn, watchedValues, accessorKey }: AlertControlUiProps) {
  const { uiProps: relatedUiProps } = useMemo(() => relateFn?.(watchedValues ?? {}) ?? {}, [relateFn, watchedValues]);
  const dataTestAttribute = parseKeyToDataTest('alert', accessorKey);
  const visible = relatedUiProps?.visible ?? uiProps?.visible ?? true;

  if (!visible) {
    return null;
  }

  return (
    <Alert
      description={''}
      appearance='info'
      outline
      {...uiProps}
      {...relatedUiProps}
      data-test-id={dataTestAttribute}
    />
  );
}
