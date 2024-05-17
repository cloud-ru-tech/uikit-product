import { MouseEvent, ReactNode, useMemo } from 'react';

import { ChevronLeftSVG, FileSVG } from '@sbercloud/uikit-product-icons';
import { useLanguage } from '@sbercloud/uikit-product-utils';
import { ItemProps } from '@snack-uikit/list';

import { SidebarTitle } from '../helperComponents/SidebarTitle';
import { textProvider, Texts } from '../helpers/texts-provider';
import { Documentation, HeaderProps, SidebarItem } from '../types';

const EMPTY_LIST: ItemProps[] = [];

export function useTopPinnedContent(header?: HeaderProps): { title?: ReactNode; pinTop: ItemProps[] } {
  const { languageCode } = useLanguage();

  return useMemo(() => {
    switch (header?.type) {
      case 'title':
        return {
          pinTop: [
            {
              content: <SidebarTitle title={header.label} icon={header.icon} />,
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
  }, [header, languageCode]);
}

export function useBottomPinnedContent(documentation?: Documentation): ItemProps[] {
  const { languageCode } = useLanguage();

  return useMemo(
    () =>
      documentation
        ? [
            {
              content: { option: textProvider(languageCode, Texts.Documentation) },
              beforeContent: <FileSVG />,
              itemWrapRender: documentation.href ? item => <a {...documentation}>{item}</a> : undefined,
              onClick: documentation.href ? undefined : documentation.onClick,
            },
          ]
        : EMPTY_LIST,
    [documentation, languageCode],
  );
}

export function useItemsContent(items: SidebarItem[], onSelect?: (id: string | number) => void): ItemProps[] {
  return useMemo(
    () =>
      items.map(({ id, label, href, onClick, afterContent }): ItemProps => {
        const clickHandler = (event: MouseEvent<HTMLElement>) => {
          onClick?.(event);
          onSelect?.(id);
        };

        return {
          id,
          content: { option: label },
          itemWrapRender: href
            ? item => (
                <a href={href} onClick={clickHandler}>
                  {item}
                </a>
              )
            : undefined,
          onClick: href ? undefined : clickHandler,
          afterContent,
        };
      }),
    [items, onSelect],
  );
}
