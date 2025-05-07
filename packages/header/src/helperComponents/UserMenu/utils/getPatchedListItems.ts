import { MouseEventHandler } from 'react';

import { isBaseItemProps, ItemProps, ListProps } from '@snack-uikit/list';

type UsePatchedListItems = { items: ListProps['items']; callback: MouseEventHandler };

export function getPatchedListItems({ items, callback }: UsePatchedListItems) {
  const patchItem = (item: ItemProps, cb: MouseEventHandler): ItemProps => {
    if (isBaseItemProps(item)) {
      return {
        ...item,
        onClick(e) {
          item.onClick?.(e);
          cb(e);
        },
      };
    }

    return { ...item, items: item.items.map(i => patchItem(i, cb)) };
  };

  return items.map(item => patchItem(item, callback));
}
