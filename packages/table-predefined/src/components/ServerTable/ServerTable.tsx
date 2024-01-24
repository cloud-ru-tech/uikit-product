import debounce from 'lodash.debounce';
import { ReactNode, useCallback, useMemo, useState } from 'react';

import { WithSupportProps } from '@sbercloud/uikit-product-utils';
import {
  ColumnDefinition,
  PaginationState,
  RowClickHandler,
  RowSelectionOptions,
  RowSelectionState,
  SortingState,
  TableEmptyStateProps,
  ToolbarProps,
} from '@snack-uikit/table';

import { Table } from '../Table';
import { DEFAULT_PAGINATION_LIMIT, SEARCH_DELAY } from './constants';

export type ServerTableProps<TData extends object> = WithSupportProps<{
  /** Данные для отрисовки */
  items: TData[];
  /** Общее кол-во строк  @default 10 */
  total?: number;
  /** Кол-во строк на страницу @default 10 */
  limit?: number;
  /** Смещение @default 0 */
  offset?: number;

  onChangePage(offset: number, limit: number): void;

  /** Определение внешнего вида и функционала колонок */
  columnDefinitions: ColumnDefinition<TData>[];
  /** Параметры отвечают за возможность сортировки, их стоит использовать если нужно отслеживать состояние <br>
   *  <strong>initialState</strong>: Начальное состояние сортировки <br>
   *  <strong>state</strong>: Состояние сортировки, жестко устанавливаемое снаружи <br>
   * <strong>onChange</strong>: Колбэк на изменение сортировки
   *  */
  sorting?: {
    initialState?: SortingState;
    state: SortingState;
    onChange(state: SortingState): void;
  };
  /** Параметры отвечают за возможность выбора строк <br>
   * <strong>initialState</strong>: Начальное состояние выбора строк <br>
   * <strong>state</strong>: Состояние выбора строк, жестко устанавливаемое снаружи <br>
   * <strong>enable</strong>: Колбэк определяющий можно ли выбрать строку <br>
   * <strong>multiRow</strong>: Мульти-выбор строк (включен по-умолчанию, когда включается выбор) <br>
   * <strong>onChange</strong>: Колбэк на выбор строк
   *  */
  rowSelection?: {
    initialState?: RowSelectionState;
    state: RowSelectionState;
    enable?: RowSelectionOptions<TData>['enableRowSelection'];
    multiRow?: boolean;
    onChange(state: RowSelectionState): void;
  };
  /** Параметры отвечают за глобальный поиск в таблице <br>
   * <strong>initialState</strong>: Начальное состояние строки поиска <br>
   * <strong>state</strong>: Состояние строки поиска, жестко устанавливаемое снаружи <br>
   * <strong>placeholder</strong>: Placeholder строки поиска @default 'Search...'<br>
   * <strong>loading</strong>: Состояние загрузки в строке поиска <br>
   * <strong>onChange</strong>: Колбэк на изменение данных в строке поиска
   *  */
  search: {
    initialValue?: string;
    state: string;
    placeholder?: string;
    loading?: boolean;
    onChange(value: string): void;
  };

  /** Параметры отвечают за пагинацию в таблице <br>
   * <strong>options</strong>: Варианты в выпадающем селекторе для установки кол-ва строк на страницу<br>
   * <strong>optionsLabel</strong>: Текст для селектора кол-ва строк на страницу @default 'Rows volume' <br>
   *  */
  pagination?: {
    options?: number[];
    optionsLabel?: string;
  };

  /** Колбэк клика по строке */
  onRowClick?: RowClickHandler<TData>;
  /** CSS-класс */
  className?: string;

  /** Состояние загрузки */
  loading?: boolean;

  /** Колбек обновления данных */
  onRefresh(): void;

  /** Колбек удаления выбранных */
  onDelete?(selectionState: RowSelectionState, resetRowSelection: (defaultState?: boolean) => void): void;

  /** Внешний бордер для тулбара и таблицы*/
  outline?: boolean;

  /** Фильтры*/
  columnFilters?: ReactNode;

  /** Название файла при экспорте CSV/XLSX*/
  exportFileName?: string;

  /** Элементы выпадающего списка кнопки с действиями */
  moreActions?: ToolbarProps['moreActions'];

  /** Экран при отстутствии данных */
  noDataState?: TableEmptyStateProps;
  /** Экран при отстутствии результатов поиска */
  noResultsState?: TableEmptyStateProps;

  /** Отключение тулбара */
  suppressToolbar?: boolean;
  /** Отключение пагинации */
  suppressPagination?: boolean;
}>;

export function ServerTable<TData extends object>({
  items,
  total = DEFAULT_PAGINATION_LIMIT,
  limit = DEFAULT_PAGINATION_LIMIT,
  offset = 0,
  onChangePage,
  search,
  pagination,
  columnFilters,
  ...rest
}: ServerTableProps<TData>) {
  const [tempSearch, setTempSearch] = useState('');

  const onSearchDebounced = useMemo(
    () =>
      debounce((newValue: string, onChange: (newValue: string) => void) => {
        onChange(newValue);
      }, SEARCH_DELAY),
    [],
  );

  const handleSearch = useCallback(
    (newValue: string) => {
      setTempSearch(newValue);
      onSearchDebounced(newValue.trim(), search.onChange);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [limit, onSearchDebounced],
  );

  const handlePageChange = useCallback(
    ({ pageSize, pageIndex }: PaginationState) => onChangePage(pageIndex * pageSize, pageSize),
    [onChangePage],
  );

  const pageIndex = useMemo(() => Math.floor(offset / limit), [limit, offset]);
  const pageCount = useMemo(() => Math.ceil(total / limit), [limit, total]);

  return (
    <Table
      data={items || []}
      search={{
        state: tempSearch,
        onChange: handleSearch,
      }}
      columnFilters={columnFilters}
      pageCount={pageCount}
      pagination={{
        ...pagination,
        state: {
          pageIndex,
          pageSize: limit,
        },
        onChange: handlePageChange,
      }}
      pageSize={limit}
      {...rest}
    />
  );
}

ServerTable.getRowActionsColumnDef = Table.getRowActionsColumnDef;
ServerTable.getStatusColumnDef = Table.getStatusColumnDef;
