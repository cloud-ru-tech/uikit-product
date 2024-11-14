import { ReactNode, useMemo } from 'react';

import { useCalculatorContext } from '../../../contexts';
import { FormValues } from '../../../types';
import { FormControl } from '..';
import { CONTROL } from '../constants';
import { Control } from '../Control';
import { ObjectDecorator } from '../ObjectDecorator';
import { BaseDecoratorProps } from '../types';
import styles from './styles.module.scss';

type RowConfig = {
  controls: string[];
  template?: string;
};

type FormRow = string | [string, string] | ReactNode | RowConfig;

function isRowConfig(row: FormRow): row is RowConfig {
  return Boolean(typeof row === 'object' && row && 'controls' in row);
}

export type ObjectControl = {
  type: typeof CONTROL.Object;
  /**
   * Контроллы для описания конфигурации продукта
   *
   * Ключи используются для ui схемы
   *
   * @example {
   *  alert: {
   *    type: CONTROL.Alert,
   *     ...someAlertProps
   *   },
   *   cpu: {
   *     type: CONTROL.Segmented,
   *     ...someSegmentedProps
   *   }
   * }
   */
  controls: Record<string, FormControl>;
  /**
   * Построчная UI схема для отображения контроллов.
   *
   * Элементы - ключи объекта controls
   *
   * @example ['specification', ['cpu', 'ram'], ['systemDisk', 'additionalDisk'], ['instanceCount']],
   */
  ui: FormRow[];
  /** Флаг, отрисовывать элемент или нет */
  visible?: boolean;
  /** Исходное значение */
  defaultValue?: FormValues;
  decoratorProps?: Pick<BaseDecoratorProps, 'label' | 'labelTooltip'>;
  /**
   * Отслеживаемые "более главные" поля
   *
   * @example { storageClass: 'storages[0].obs.storageClass' },
   */
  watchedControls?: Record<string, string>;
  /**
   * Функция для изменения параметров контролла
   *
   * @param watchedValues - вычисленные 'watchedControls'
   *
   * @example ({ storageClass }) => {
   *    if (storageClass !== StorageClassItem.Cold) {
   *      return {
   *           visible: false,
   *      };
   *    }
   *  }
   */
  relateFn?(watchedValues: FormValues):
    | {
        visible?: boolean;
      }
    | undefined;
};

type ObjectControlUiProps = ObjectControl & { watchedValues?: FormValues };

export function ObjectControlUi({
  controls,
  ui,
  watchedValues,
  relateFn,
  visible: visibleProp,
  decoratorProps,
}: ObjectControlUiProps) {
  const { layoutType } = useCalculatorContext();
  const isMobile = layoutType === 'mobile';
  const { visible: relatedVisible } = useMemo(() => relateFn?.(watchedValues ?? {}) ?? {}, [relateFn, watchedValues]);

  const visible = relatedVisible ?? visibleProp ?? true;

  if (!visible) {
    return null;
  }

  return (
    <>
      {decoratorProps && decoratorProps.label && <ObjectDecorator {...decoratorProps} />}

      {ui.map(uiRow => {
        if (typeof uiRow === 'string') {
          return <Control formControl={controls[uiRow]} key={uiRow} />;
        }

        if (Array.isArray(uiRow)) {
          return (
            <div className={styles.row} data-mobile={isMobile || undefined} key={uiRow.join(' ')}>
              {uiRow.map(rowItem => (
                <Control formControl={controls[rowItem]} key={rowItem} />
              ))}
            </div>
          );
        }

        if (isRowConfig(uiRow)) {
          return (
            <div
              className={styles.rowConfig}
              key={uiRow.controls.join(' ')}
              style={{
                gridTemplateColumns: uiRow.template || '1fr 84px',
              }}
            >
              {uiRow.controls.map(rowItem => (
                <Control formControl={controls[rowItem]} key={rowItem} />
              ))}
            </div>
          );
        }

        return <>{uiRow}</>;
      })}
    </>
  );
}
