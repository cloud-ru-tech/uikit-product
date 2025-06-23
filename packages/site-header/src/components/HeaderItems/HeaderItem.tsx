import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';

import { LinkItemHeader, MoreButton } from '../../helperComponents';
import { useResizeObserver } from '../../hooks';
import styles from './styles.module.scss';
import { LinkItem } from './types';

export type HeaderItemProps = {
  /** Список элементов для пунктов меню хэдера */
  linkItems?: LinkItem[];
  /** Флаг является ли сейчас мобильная версия */
  isMobileTabletView?: boolean;
  /** Id активного элемента списка меню */
  activeLinkItemId?: string;
};

const GAP_ITEMS = 22;

const WIDTH_MORE_BUTTON = 24;

export function HeaderItems({ linkItems, isMobileTabletView, activeLinkItemId }: HeaderItemProps) {
  const [visibleItems, setVisibleItems] = useState<LinkItem[]>([]);
  const [hiddenItems, setHiddenItems] = useState<LinkItem[]>([]);

  const hiddenRowElementRef = useRef<HTMLDivElement>(null);

  const [firstItemElement, setFirstItemElement] = useState<HTMLElement | null>(null);
  const itemsMapRef = useRef(new Map<LinkItem, HTMLElement | null>());

  const { width: maxWidth } = useResizeObserver(hiddenRowElementRef.current);
  const { width: firstVisibleItemWidth } = useResizeObserver(firstItemElement);

  function setItemElement(item: LinkItem, index: number) {
    return (itemElement: HTMLElement | null) => {
      if (index === 0 && itemElement) {
        setFirstItemElement(itemElement);
      }

      if (itemElement === null) {
        itemsMapRef.current.delete(item);
      } else {
        itemsMapRef.current.set(item, itemElement);
      }
    };
  }

  useEffect(() => {
    if (maxWidth < 1) {
      return;
    }

    const newVisibleItems: LinkItem[] = [];
    const newHiddenItems: LinkItem[] = [];
    let isHidden = false;
    let indexElement = 0;

    let currentRowWidth = 0;

    const size = itemsMapRef.current.size;

    itemsMapRef.current.forEach((itemElement, itemRowItem) => {
      const itemWidth = itemElement?.offsetWidth || 0;
      const isLastElement = indexElement + 1 === size;
      const sumRowWidth = currentRowWidth + itemWidth + (isLastElement ? 0 : GAP_ITEMS);

      if (isHidden) {
        newHiddenItems.push(itemRowItem);
      } else {
        if (maxWidth > sumRowWidth + (isLastElement ? 0 : WIDTH_MORE_BUTTON)) {
          newVisibleItems.push(itemRowItem);
          currentRowWidth = sumRowWidth;
        } else {
          newHiddenItems.push(itemRowItem);
          isHidden = true;
        }
      }
      indexElement++;
    });

    setVisibleItems(newVisibleItems);
    setHiddenItems(newHiddenItems);
  }, [linkItems, maxWidth, firstVisibleItemWidth]);

  if (!linkItems || isMobileTabletView) return null;

  const isVisibleEmpty = visibleItems.length === 0;

  return (
    <div className={styles.wrapper}>
      <div className={cn(styles.linkItemsContainer, styles.hiddenRow)} ref={hiddenRowElementRef}>
        {linkItems.map((linkItem, index) => (
          <div key={linkItem.id} className={styles.lastItemContainer} ref={setItemElement(linkItem, index)}>
            <LinkItemHeader
              label={linkItem.label}
              target={linkItem.target}
              href={linkItem.href}
              onClick={linkItem.onClick}
            />
          </div>
        ))}
      </div>
      <div
        className={cn(styles.linkItemsContainer, {
          [styles.linkItemsFirstViewContainer]: isVisibleEmpty,
        })}
      >
        {/*Добавлено для сайта, так как используется next и приходит html без расчета js*/}
        {(isVisibleEmpty ? linkItems : visibleItems).map(linkItem => (
          <div key={linkItem.id} className={styles.lastItemContainer}>
            <LinkItemHeader
              label={linkItem.label}
              href={linkItem.href}
              onClick={linkItem.onClick}
              active={activeLinkItemId === linkItem.id}
            />
          </div>
        ))}
        {hiddenItems.length > 0 && <MoreButton linkItemsArray={hiddenItems} activeItemId={activeLinkItemId} />}
      </div>
    </div>
  );
}
