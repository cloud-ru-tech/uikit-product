import { MouseEvent, useMemo } from 'react';

import { MobileDroplistProps } from '@sbercloud/uikit-product-mobile-dropdown';
import { MobileTooltip } from '@sbercloud/uikit-product-mobile-tooltip';

import { SidebarItem } from './types';

export function useItemsContent(
  items: SidebarItem[],
  onSelect?: (id: string | number) => void,
): MobileDroplistProps['items'] {
  return useMemo(
    () =>
      items.map(({ id, label, href, onClick, afterContent, disabledReason }) => {
        const clickHandler = (event: MouseEvent<HTMLElement>) => {
          onClick?.(event);
          onSelect?.(id);
        };

        return {
          id,
          content: {
            option: label,
          },
          itemWrapRender: item => {
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
      }),
    [items, onSelect],
  );
}
