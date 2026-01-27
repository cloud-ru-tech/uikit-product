import { ReactNode } from 'react';

import { WithLayoutType, WithSupportProps } from '@cloud-ru/uikit-product-utils';

type ColumnConfig = {
  /** Количество колонок для текущего layout */
  amount: number;
  /** Минимальная ширина колонки */
  minWidth: number;
};

type ColumnsConfig = {
  desktop?: ColumnConfig;
  desktopSmall?: ColumnConfig;
  tablet?: ColumnConfig;
  mobile?: ColumnConfig;
};

export type GridProps = WithSupportProps<
  WithLayoutType<{
    /** Содержимое */
    children: ReactNode;
    /** Конфигурация настройки колонок для разных layoutType */
    columnsConfig: ColumnsConfig;
    /** Расстояние между колонками и рядами */
    gap?: 'xs' | 's' | 'm' | 'l';
    className?: string;
  }>
>;
