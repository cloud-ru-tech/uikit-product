import { MouseEvent, ReactNode, useMemo } from 'react';

import { ChevronLeftSVG } from '@sbercloud/uikit-product-icons';
import { useLocale } from '@sbercloud/uikit-product-locale';
import { ItemProps } from '@snack-uikit/list';
import { Tooltip } from '@snack-uikit/tooltip';

import { SidebarSearchToggle } from '../helperComponents/SidebarSearchToggle';
import { SidebarTitle } from '../helperComponents/SidebarTitle';
import { HeaderProps, SidebarItem } from '../types';

const EMPTY_LIST: ItemProps[] = [];

export function useTopPinnedContent(
  header?: HeaderProps,
  hasSearch?: boolean,
): { title?: ReactNode; pinTop: ItemProps[] } {
  const { t } = useLocale('PageLayout');

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
              content: { option: `${t('PageSidebar.backTo')} ${header.label}` },
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
  }, [header, t, hasSearch]);
}

export function useItemsContent(items: SidebarItem[], onSelect?: (id: string | number) => void): ItemProps[] {
  return useMemo(() => {
    const getItemsContent = (items: SidebarItem[], onSelect?: (id: string | number) => void) =>
      items.map(
        ({
          id,
          label,
          beforeContent,
          onClick,
          afterContent,
          disabledReason,
          disabledReasonPlacement,
          ...rest
        }): ItemProps => {
          const href = 'href' in rest ? rest.href : undefined;
          const newItems = 'items' in rest ? rest.items : undefined;
          const type = 'type' in rest ? rest.type : undefined;

          const clickHandler = (event: MouseEvent<HTMLElement>) => {
            if (href && (event?.metaKey || event?.button === 1)) {
              return;
            }

            event.preventDefault();
            onClick?.(event);
            onSelect?.(id);
          };

          if (type === 'group') {
            return {
              ...rest,
              label,
              type: 'group',
              items: getItemsContent(newItems || [], onSelect),
            };
          }

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
                <Tooltip
                  hoverDelayOpen={500}
                  open={disabledReason ? undefined : false}
                  tip={disabledReason}
                  placement={disabledReasonPlacement}
                >
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
              items: getItemsContent(newItems || [], onSelect),
            };
          }

          return newItem;
        },
      );

    return getItemsContent(items, onSelect);
  }, [items, onSelect]);
}
