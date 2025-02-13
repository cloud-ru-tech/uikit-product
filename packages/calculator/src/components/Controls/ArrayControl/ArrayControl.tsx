import { PlusSVG, TrashSVG } from '@sbercloud/uikit-product-icons';
import { ButtonFunction } from '@snack-uikit/button';

import { ProductContext, useProductContext } from '../../../contexts';
import { useAdaptive } from '../../../hooks';
import { AnyType } from '../../../types';
import { getValue, parseKeyToDataTest, setValue } from '../../../utils';
import { CONTROL } from '../constants';
import { ObjectControl, ObjectControlUi } from '../ObjectControl';
import { getDefaultValues } from '../utils';
import styles from './styles.module.scss';

export type ArrayControl = {
  type: typeof CONTROL.Array;
  /** Минимальное кол-во элементов массива */
  min?: number;
  /** Максимальное кол-во элементов массива */
  max: number;
  /**
   * Поле (полный путь),  куда будет сохраняться значение
   *
   * @example 'esc.cpu'
   */
  accessorKey: string;
  /** Текст кнопки добавления нового элемента */
  addText: string;
  /** Дефолтное значение */
  defaultValue: AnyType[];

  invertTrashOffset?: boolean;

  onChangeFn?: never;
  relateFn?: never;
} & Omit<ObjectControl, 'type'>;

type ArrayControlUiProps = ArrayControl;

export function ArrayControlUi({
  accessorKey,
  ui,
  controls,
  max,
  addText,
  min = 0,
  invertTrashOffset,
}: ArrayControlUiProps) {
  const { value: valueProp, onChange: onChangeProp } = useProductContext();
  const { isMobile } = useAdaptive();

  const value: AnyType[] = getValue(valueProp, accessorKey);
  const onChange = (newValue: AnyType) => {
    setValue(valueProp, accessorKey, newValue);

    onChangeProp(valueProp);
  };

  return (
    <div className={styles.container}>
      {value?.map((_, idx) => (
        <ProductContext.Provider
          key={idx}
          value={{
            value: { ...getValue(value, `[${idx}]`) },
            onChange: newValue => {
              setValue(value, `[${idx}]`, newValue);
              onChange(value);
            },
          }}
        >
          <div key={idx} className={styles.row}>
            <div className={styles.wrap} data-mobile={isMobile || undefined}>
              <ObjectControlUi ui={ui} controls={controls} type={CONTROL.Object} />
            </div>

            {(value ?? []).length > min && (
              <ButtonFunction
                icon={<TrashSVG />}
                className={invertTrashOffset ? styles.trashInvert : styles.trash}
                size='m'
                onClick={() => {
                  value?.splice(idx, 1);
                  onChange(value);
                }}
              />
            )}
          </div>
        </ProductContext.Provider>
      ))}

      {(value ?? []).length < max && (
        <ButtonFunction
          icon={<PlusSVG />}
          size='m'
          iconPosition='before'
          label={addText}
          onClick={() => {
            onChange((value ?? []).concat([getDefaultValues(controls)]));
          }}
          data-test-id={parseKeyToDataTest('button')}
        />
      )}
    </div>
  );
}
