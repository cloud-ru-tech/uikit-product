import { ColumnDefinition } from '@snack-uikit/table';

/**
 * Возвращает идентификатор колонки: `id`, либо `accessorKey`, если `id` не задан
 * @function getColumnIdentifier
 */
export function getColumnIdentifier<TData extends object>(colDef: ColumnDefinition<TData>): string | undefined {
  if ('id' in colDef && colDef.id) {
    return colDef.id;
  }

  if ('accessorKey' in colDef && colDef.accessorKey) {
    return String(colDef.accessorKey);
  }

  return undefined;
}
