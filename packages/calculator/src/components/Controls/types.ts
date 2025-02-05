import { ReactNode } from 'react';

import { AnyType, FormValues } from '../../types';
import { AlertControl } from './AlertControl';
import { ArrayControl } from './ArrayControl';
import { CarouselControl } from './CarouselControl';
import { ObjectControl } from './ObjectControl';
import { SegmentedControl } from './SegmentedControl';
import { SelectMultipleControl, SelectSingleControl } from './SelectControl';
import { SliderControl } from './SliderControl';
import { StepperControl } from './StepperControl';
import { TableControl } from './TableControl';
import { ToggleCardsControl } from './ToggleCardsControl';
import { ToggleControl } from './ToggleControl';
import { ToggleObjectControl } from './ToggleObjectControl';

/** Базовые параметры декоратора для поля */
export type BaseDecoratorProps = {
  /** Лейбл */
  label?: string;
  /** Дополнительный текст */
  hint?: string;
  /** Вспомогательный тултип */
  labelTooltip?: ReactNode;
  /** Дополтительный текст сверху */
  caption?: string;
  /** Флаг обязательное поле или нет */
  required?: boolean;
};

export type WithVisible<T> = T & {
  /** Флаг, отрисовывать элемент или нет */
  visible?: boolean;
};

export type BaseControl<UiPropsT, DecoratorPropsT = BaseDecoratorProps> = {
  /** Пропсы для декоратора
   *
   * @example
   * {
   *  label: 'Колличество vCpu',
   *  labelToolTip: 'Виртуальные ядра'
   * }
   */
  decoratorProps: DecoratorPropsT;
  /**
   * Специфичные пропсы для контролла
   *
   * @example
   * {
   *  min: 0;
   *  max: 100;
   *  visible: true;
   * }
   */
  uiProps?: WithVisible<UiPropsT>;
  /**
   * Поле (полный путь),  куда будет сохраняться значение контролла
   *
   * @example 'esc.cpu'
   */
  accessorKey?: string;
  /**
   * Функция для мутирования значения формы, eсли при изменении контролла, нужно изменить "явно" значения других
   *
   *
   * @param {string} value - Новое значение, которое было установлено.
   *
   * @param {function(Array<[string, AnyType]>): void} setValue - Функция для установки нового значения.
   *
   * @returns {void}
   *
   * @example (value, setValue) => {
   *  // Изменение значения текущего контролла
   *  const arr = [['currentControlAccessorKey', value]];
   *  // Некоторое условие
   *  if(...someRule) {
   *    // Задаем значения для других контроллов
   *    arr.push(['someAnotherKey_1', someValue_1]);
   *    arr.push(['someAnotherKey_2', someValue_2]);
   * }
   * // Мутируем конфигурацию формы, чтобы применить изменения
   * setValue(arr);
   * }
   */
  onChangeFn?(value: string, setValue: (arr: [string, AnyType][]) => void): void;
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
   *         uiProps: {
   *           visible: false,
   *        },
   *      };
   *    }
   *  }
   */
  relateFn?(watchedValues: FormValues):
    | {
        decoratorProps?: Partial<DecoratorPropsT>;
        uiProps?: Partial<WithVisible<UiPropsT>>;
      }
    | undefined;
};

export type BaseControlWithItems<ItemT, UiPropsT, DecoratorPropsT = BaseDecoratorProps> = Omit<
  BaseControl<UiPropsT, DecoratorPropsT>,
  'relateFn'
> & {
  /** Массив перечисляемых опций */
  items: ItemT[];
  /**
   * Функция для изменения параметров контролла
   *
   * @param watchedValues - вычисленные 'watchedControls'
   *
   * @example ({ storageClass }) => {
   *    if (storageClass !== StorageClassItem.Cold) {
   *      return {
   *         uiProps: {
   *           visible: false,
   *        },
   *      };
   *    }
   *  }```
   */
  relateFn?(watchedValues: FormValues):
    | {
        decoratorProps?: Partial<DecoratorPropsT>;
        uiProps?: Partial<WithVisible<UiPropsT>>;
        items?: ItemT[];
      }
    | undefined;
};

export type FormControl =
  | CarouselControl
  | SelectSingleControl
  | SelectMultipleControl
  | SegmentedControl
  | ToggleControl
  | StepperControl
  | ObjectControl
  | ArrayControl
  | ToggleObjectControl
  | AlertControl
  | ToggleCardsControl
  | SliderControl
  | TableControl;

export type FormConfig = Omit<ObjectControl, 'type'>;
