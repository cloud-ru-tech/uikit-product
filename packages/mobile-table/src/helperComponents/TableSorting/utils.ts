import { Header } from '@tanstack/react-table';

import { ColumnDefinition } from '@snack-uikit/table';

export function getHeaderLabel<TData extends object>(header: Header<TData, unknown>): string {
  const headerDef = header.column.columnDef.header;

  if (typeof headerDef === 'string') {
    return headerDef;
  }

  if (typeof headerDef === 'function') {
    try {
      const context = header.getContext();
      const result = headerDef(context);

      if (typeof result === 'string' || typeof result === 'number') {
        return String(result);
      }

      if (result != null && typeof result === 'object' && 'props' in result && result.props) {
        const children = result.props.children;

        if (typeof children === 'string' || typeof children === 'number') {
          return String(children);
        }

        if (Array.isArray(children)) {
          const textChild = children.find(child => typeof child === 'string' || typeof child === 'number');
          if (textChild != null) {
            return String(textChild);
          }
        }
      }
    } catch (error) {
      console.error('Error getting header label:', error);
    }
  }

  return header.id || header.column.id || '';
}

export function createColumnDefMap<TData extends object>(
  columnDefinitions: ColumnDefinition<TData>[],
): Map<string, ColumnDefinition<TData>> {
  const map = new Map<string, ColumnDefinition<TData>>();
  columnDefinitions.forEach(colDef => {
    let id: string | undefined;
    if ('id' in colDef && colDef.id) {
      id = colDef.id;
    } else if ('accessorKey' in colDef && colDef.accessorKey) {
      id = String(colDef.accessorKey);
    }
    if (id) {
      map.set(id, colDef);
    }
  });
  return map;
}

export function groupHeadersByPinned<TData extends object>(
  headers: Header<TData, unknown>[],
  columnDefMap: Map<string, ColumnDefinition<TData>>,
) {
  const leftHeaders: Header<TData, unknown>[] = [];
  const unpinnedHeaders: Header<TData, unknown>[] = [];
  const rightHeaders: Header<TData, unknown>[] = [];

  headers.forEach(header => {
    const columnDef = columnDefMap.get(header.id);
    if (!columnDef) {
      unpinnedHeaders.push(header);
      return;
    }

    switch (columnDef.pinned) {
      case 'left':
        leftHeaders.push(header);
        break;
      case 'right':
        rightHeaders.push(header);
        break;
      default:
        unpinnedHeaders.push(header);
    }
  });

  return { leftHeaders, unpinnedHeaders, rightHeaders };
}
