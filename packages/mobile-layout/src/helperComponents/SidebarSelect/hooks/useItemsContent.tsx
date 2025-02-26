import { MouseEvent, ReactNode, useMemo } from 'react';

import { MobileDroplistProps } from '@sbercloud/uikit-product-mobile-dropdown';
import { MobileTooltip } from '@sbercloud/uikit-product-mobile-tooltip';
import { SidebarItem } from '@sbercloud/uikit-product-page-layout';

const getItemsContent = (
  items: SidebarItem[],
  onSelect?: (id: string | number) => void,
): MobileDroplistProps['items'] =>
  items.map(({ id, label, href, onClick, afterContent, disabledReason, items: newItems }) => {
    const clickHandler = (event: MouseEvent<HTMLElement>) => {
      onClick?.(event);
      if (!items.length) {
        onSelect?.(id);
      }
    };

    const newItem = {
      id,
      content: {
        option: label,
      },
      itemWrapRender: (item: ReactNode) => {
        if (!disabledReason) {
          return href ? (
            <a href={href} onClick={clickHandler}>
              {item}
            </a>
          ) : (
            item
          );
        }

        return (
          <MobileTooltip hoverDelayOpen={500} open={disabledReason ? undefined : false} tip={disabledReason}>
            {item}
          </MobileTooltip>
        );
      },

      onClick: href ? undefined : clickHandler,
      afterContent,
      disabled: Boolean(disabledReason),
    };

    if (newItems?.length) {
      return {
        ...newItem,
        type: 'collapse',
        items: getItemsContent(newItems, onSelect),
      };
    }

    return newItem;
  });

export function useItemsContent(
  items: SidebarItem[],
  onSelect?: (id: string | number) => void,
): MobileDroplistProps['items'] {
  return useMemo(() => getItemsContent(items, onSelect), [items, onSelect]);
}
