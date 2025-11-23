import { CellContext, HeaderContext } from '@tanstack/react-table';

import { FiltersState } from '@sbercloud/uikit-product-mobile-chips';
import { Status, StatusProps } from '@snack-uikit/status';

import { MobileTableProps } from '../../components';
import { TEST_IDS } from '../../constants';

export type StatusAppearance = StatusProps['appearance'];

export type StatusColumnDefProps<TData extends object> = {
  /** Ключ для доступа к значению статуса в данных */
  accessorKey: keyof TData;
  /** Маппинг значений статусов на appearance */
  mapStatusToAppearance: Record<string, StatusAppearance>;
  /** Заголовок колонки */
  header?: string | ((ctx: HeaderContext<TData, unknown>) => React.ReactNode);
  /** Функция для рендеринга описания статуса (опционально) */
  renderDescription?: (value: string) => string;
  /** Размер колонки */
  size?: number;
  /** Минимальный размер колонки */
  minSize?: number;
  /** Максимальный размер колонки */
  maxSize?: number;
  /** Закрепление колонки */
  pinned?: 'left' | 'right';
  /** Включить сортировку */
  enableSorting?: boolean;
  /** Включить изменение размера */
  enableResizing?: boolean;
};

/** Вспомогательная функция для создания колонки со статусами */
export function getStatusColumnDef<TData extends object, TFilters extends FiltersState>({
  accessorKey,
  mapStatusToAppearance,
  header = 'Статус',
  renderDescription,
  size = 150,
  minSize,
  maxSize,
  pinned,
  enableSorting = true,
  enableResizing = true,
}: StatusColumnDefProps<TData>): MobileTableProps<TData, TFilters>['columnDefinitions'][0] {
  return {
    id: String(accessorKey),
    accessorKey: String(accessorKey),
    header,
    size,
    minSize,
    maxSize,
    pinned,
    enableSorting,
    enableResizing,
    cell: (cell: CellContext<TData, unknown>) => {
      const statusValue = cell.getValue<string>();
      if (!statusValue) return null;

      const appearance = mapStatusToAppearance[statusValue] || 'neutral';
      const label = renderDescription ? renderDescription(statusValue) : statusValue;

      return (
        <Status label={label} appearance={appearance} size='s' hasBackground data-test-id={TEST_IDS.statusLabel} />
      );
    },
  } as MobileTableProps<TData, TFilters>['columnDefinitions'][0];
}
