import { MouseEvent, ReactNode, useMemo } from 'react';

import { ChevronLeftSVG } from '@sbercloud/uikit-product-icons';
import { useLanguage } from '@sbercloud/uikit-product-utils';
import { ItemProps } from '@snack-uikit/list';
import { Tooltip } from '@snack-uikit/tooltip';

import { SidebarSearchToggle } from '../helperComponents/SidebarSearchToggle';
import { SidebarTitle } from '../helperComponents/SidebarTitle';
import { textProvider, Texts } from '../helpers/texts-provider';
import { HeaderProps, SidebarItem } from '../types';

const EMPTY_LIST: ItemProps[] = [];

export function useTopPinnedContent(
  header?: HeaderProps,
  hasSearch?: boolean,
): { title?: ReactNode; pinTop: ItemProps[] } {
  const { languageCode } = useLanguage();

  return useMemo(() => {
    switch (header?.type) {
      case 'title':
        return {
          pinTop: [
            {
              content: <SidebarTitle title={header.label} icon={header.icon} afterContent={header.afterContent} />,
              afterContent: hasSearch ? <SidebarSearchToggle /> : null,
              inactive: true,
            },
          ],
        };
      case 'back':
        return {
          pinTop: [
            {
              content: { option: `${textProvider(languageCode, Texts.BackTo)} ${header.label}` },
              beforeContent: <ChevronLeftSVG />,
              onClick: header.href ? undefined : header.onClick,
              itemWrapRender: header.href
                ? item => (
                    <a href={header.href} onClick={header.onClick}>
                      {item}
                    </a>
                  )
                : undefined,
            },
          ],
        };
      default:
        return { pinTop: EMPTY_LIST };
    }
  }, [header, languageCode, hasSearch]);
}

export function useItemsContent(items: SidebarItem[], onSelect?: (id: string | number) => void): ItemProps[] {
  return useMemo(() => {
    const getItemsContent = (items: SidebarItem[], onSelect?: (id: string | number) => void) =>
      items.map(
        ({ id, label, beforeContent, href, onClick, afterContent, disabledReason, items: newItems }): ItemProps => {
          const clickHandler = (event: MouseEvent<HTMLElement>) => {
            onClick?.(event);
            onSelect?.(id);
          };

          const newItem = {
            id,
            content: { option: label },
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
                <Tooltip hoverDelayOpen={500} open={disabledReason ? undefined : false} tip={disabledReason}>
                  {item}
                </Tooltip>
              );
            },

            onClick: href ? undefined : clickHandler,
            beforeContent,
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
        },
      );

    return getItemsContent(items, onSelect);
  }, [items, onSelect]);
}
