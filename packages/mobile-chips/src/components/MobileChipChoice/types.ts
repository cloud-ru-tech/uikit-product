import { MouseEventHandler, ReactNode } from 'react';

import {
  BaseItemProps,
  DroplistProps,
  GroupItemProps,
  GroupSelectItemProps,
  ItemContentProps,
  ItemId,
  NextListItemProps,
  SelectionMultipleState,
  SelectionSingleState,
} from '@sbercloud/uikit-product-mobile-dropdown';
import { WithSupportProps } from '@snack-uikit/utils';

import { BaseChipProps, Size } from '../../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyType = any;

export type ContentRenderProps = Omit<ItemContentProps, 'option' | 'disabled'>;

export type FilterOption<T extends ContentRenderProps = ContentRenderProps> =
  // eslint-disable-next-line no-use-before-define
  | BaseOption<T>
  // eslint-disable-next-line no-use-before-define
  | AccordionOption<T>
  // eslint-disable-next-line no-use-before-define
  | GroupOption<T>
  // eslint-disable-next-line no-use-before-define
  | GroupSelectOption<T>
  // eslint-disable-next-line no-use-before-define
  | NestListOption<T>;

export type BaseOption<T extends ContentRenderProps = ContentRenderProps> = Omit<BaseItemProps, 'content' | 'id'> & {
  value: ItemId;
  label: ItemId;
  contentRenderProps?: T;
};

export type AccordionOption<T extends ContentRenderProps = ContentRenderProps> = Omit<
  BaseOption<T>,
  'switch' | 'inactive' | 'value'
> & {
  id?: ItemId;
  type: 'collapse';
  options: FilterOption<T>[];
};

export type GroupOption<T extends ContentRenderProps = ContentRenderProps> = Omit<GroupItemProps, 'items'> & {
  options: FilterOption<T>[];
};

export type GroupSelectOption<T extends ContentRenderProps = ContentRenderProps> = Omit<
  GroupSelectItemProps,
  'items'
> & {
  options: FilterOption<T>[];
};

export type NestListOption<T extends ContentRenderProps = ContentRenderProps> = Omit<
  NextListItemProps,
  'items' | 'content'
> & {
  label: ItemId;
  contentRenderProps?: T;
  options: FilterOption<T>[];
};

export type ChipChoiceCommonProps = WithSupportProps<
  Partial<BaseChipProps> & {
    /** Размер */
    size?: Size;
    /** Колбек обработки клика */
    onClick?: MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
    /** Колбек для клика по кнопке очистки */
    onClearButtonClick?: MouseEventHandler<HTMLButtonElement>;
    /** Управляет состоянием показан/не показан. */
    open?: boolean;
    /** Колбек отображения компонента. Срабатывает при изменении состояния open. */
    onOpenChange?(isOpen: boolean): void;
  }
>;

export type ChipChoiceSelectCommonProps<T extends ContentRenderProps = ContentRenderProps> = ChipChoiceCommonProps & {
  options: FilterOption<T>[];

  contentRender?(option: { label: ItemId; value?: ItemId; contentRenderProps?: T }): ReactNode;
  filterFn?(option: { label: ItemId; value?: ItemId; contentRenderProps?: T }): boolean;

  searchable?: boolean;
  /**
   * Отключает Fuzzy Search. Иногда в дроплисте могут быть различные айдишники - нам важно искать их без Fuzzy Search
   * @default false
   */
  disableFuzzySearch?: boolean;

  /** Флаг, отвечающий за применение выбранного значения по умолчанию  */
  autoApply?: boolean;
  /** Колбек основной кнопки */
  onApprove?(): void;
  /** Колбек кнопки отмены */
  onCancel?(): void;
} & Pick<
    DroplistProps,
    | 'selection'
    | 'scrollRef'
    | 'scrollContainerRef'
    | 'noDataState'
    | 'footer'
    | 'footerActiveElementsRefs'
    | 'dataError'
    | 'errorDataState'
    | 'dataFiltered'
    | 'noResultsState'
    | 'loading'
    | 'virtualized'
  >;

export type MobileChipChoiceSingleProps<T extends ContentRenderProps = ContentRenderProps> =
  ChipChoiceSelectCommonProps<T> &
    Omit<SelectionSingleState, 'mode'> & {
      /** Массив опций */
      options: FilterOption<T>[];
      /** Колбек формирующий отображение выбранного значения. Принимает выбранное значение. По умолчанию для отображения используется FilterOption.label */
      valueRender?(option?: BaseOption<T>): ReactNode;
    };

export type MobileChipChoiceMultipleProps<T extends ContentRenderProps = ContentRenderProps> =
  ChipChoiceSelectCommonProps<T> &
    Omit<SelectionMultipleState, 'mode'> & {
      /** Массив опций */
      options: FilterOption<T>[];
      /** Колбек формирующий отображение выбранного значения. Принимает выбранное значение. По умолчанию для отображения используется FilterOption.label */
      valueRender?(option?: BaseOption<T>[]): ReactNode;
    };
