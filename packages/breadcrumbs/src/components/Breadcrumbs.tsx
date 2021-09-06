import debounce from 'lodash.debounce';
import { useEffect, useMemo, useRef, useState } from 'react';

import { ChevronRightInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { Tooltip } from '@sbercloud/uikit-react-tooltip';

import {
  getDiffWidth,
  getSubstr,
  getUniqueKey,
  getWidth,
  isEllipsisActive,
  measureText,
  setUniqueKey,
} from '../helpers/calc';
import { BreadcrumbItem, StateItem } from '../helpers/types';
import {
  ChildrenContainerStyled,
  Collapsed,
  ContainerStyled,
  ItemStyled,
  ItemTextStyled,
  chevronClassName,
  cutTextClassName,
} from './styled';

export type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  onClick?(e: React.MouseEvent<HTMLParagraphElement, MouseEvent>, link?: unknown): void;
  className?: string;
  itemClassName?: string;
  children?: React.ReactNode;
  isFixedWidth?: boolean;
  renderItem?: (item: StateItem, index: number) => React.ReactNode;
};

export const Breadcrumbs = ({
  items,
  children,
  onClick,
  className,
  itemClassName,
  isFixedWidth,
  renderItem,
}: BreadcrumbsProps): JSX.Element => {
  const [isVisible, setVisible] = useState(false);
  const [isTextCut, setTextCut] = useState(false);
  const [visibleElementsCount, setVisibleElementsCount] = useState(1);
  const [hasHideElements, setHasHideElements] = useState(true);
  const [stateItems, setItems] = useState<StateItem[]>(setUniqueKey(items));
  const [metaItems, setMetaItems] = useState<StateItem[]>();
  const breadcrumbsEl = useRef<HTMLDivElement>(null);

  const stateKey = useMemo(() => getUniqueKey(setUniqueKey(items)), [items]);
  const metaKey = useMemo(() => getUniqueKey(stateItems), [stateItems]);

  const resetBreadcrumbs = () => {
    setVisible(false);
    setTextCut(false);
    setHasHideElements(true);
    setVisibleElementsCount(1);
    const nextItems = setUniqueKey(items);
    setItems(nextItems);
  };
  const debounceResetBreadcrumbs = debounce(resetBreadcrumbs, 300);

  useEffect(resetBreadcrumbs, [stateKey]);

  useEffect(() => {
    window.addEventListener('resize', debounceResetBreadcrumbs);

    return () => {
      window.removeEventListener('resize', debounceResetBreadcrumbs);
    };
  }, [debounceResetBreadcrumbs]);

  useEffect(() => {
    setTimeout(() => {
      const el = breadcrumbsEl.current;

      if (el && !isEllipsisActive(el) && !isTextCut) {
        setMetaItems(stateItems);
        setHasHideElements(false);
        setVisible(true);
        return;
      }

      if (!isTextCut) {
        setMetaItems(stateItems);
        setTextCut(true);
        return;
      }

      const maxWidth = getWidth(el);

      const childsEl: HTMLDivElement[] = Array.from(el?.children || []) as HTMLDivElement[];

      const extensionWidth = childsEl.reduce((acc, curr) => {
        let next = acc;
        if (curr.dataset.extension && getWidth(curr)) {
          const style = window?.getComputedStyle(curr);
          const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
          next += getWidth(curr) + (margin || 0);
        }
        return next;
      }, 0);
      const childs = childsEl?.filter(el => !el.dataset.extension);
      if (!childs.length) return;

      const nextItems = [...items] as StateItem[];
      let visibleWidth = 0;

      const chevronBlock = el?.querySelector('[data-chevron]');
      const chevronBlockWidth = getWidth(chevronBlock);

      const collapsedBlock = el?.querySelector('[data-collapsed]');
      const collapsedBlockWidth = getWidth(collapsedBlock);

      for (const [index, item] of nextItems.entries()) {
        if (index !== 0 && !item.fullVisible) break;
        const child = childs[index];
        const isFirst = index === 0;
        const isLastVisible = !stateItems[index + 1]?.fullVisible;
        const defaultWidth = getWidth(child);
        const textWidth = measureText(child, stateItems[index].text).width;

        const width = isFirst ? getDiffWidth(child, collapsedBlock) : defaultWidth;

        nextItems[index] = {
          ...nextItems[index],
          visible: true,
          tooltip: textWidth > width,
          width,
          isLastForceVisible: isLastVisible,
        };
        visibleWidth += getWidth(childs[index]);
      }

      const visibleCount = nextItems.filter(item => item.visible).length;
      setVisibleElementsCount(visibleCount);

      const res = {
        maxWidth: maxWidth - visibleWidth - extensionWidth + collapsedBlockWidth,
        maxVisibleWidth: maxWidth - extensionWidth,
      };

      const notForceVisible = nextItems.filter(item => !item.visible);
      const isOnlyVisible = nextItems.length === visibleCount;

      for (let i = 0; i < notForceVisible.length && !isOnlyVisible; i++) {
        const lastIndex = childs.length - 1;
        const currIndex = lastIndex - i;
        const isLast = lastIndex === i;
        const child = childs[currIndex];

        const nextWidth = res.maxWidth - getWidth(child);
        const textWidth = measureText(child, stateItems[currIndex].text).width + chevronBlockWidth;

        const lastElWidth = textWidth > res.maxWidth ? res.maxWidth : textWidth;

        const elWidth = nextWidth > 0 && childs.length > 2 ? getWidth(child) : lastElWidth;

        if (nextWidth < 0 && !isLast) {
          const child = childs[lastIndex];
          const textWidth = measureText(child, stateItems[lastIndex].text).width + chevronBlockWidth;
          const restWidth = (nextItems[lastIndex]?.width || 0) + elWidth;
          const nextWidth = textWidth > restWidth ? restWidth : textWidth;

          nextItems[lastIndex] = {
            ...nextItems[lastIndex],
            width: nextWidth,
            visible: true,
          };
          break;
        }

        if (currIndex === 1 && nextWidth > 0) {
          nextItems[lastIndex] = {
            ...nextItems[lastIndex],
            width: (nextItems[lastIndex]?.width || 0) + nextWidth,
          };
        }

        nextItems[currIndex] = {
          ...nextItems[currIndex],
          visible: true,
          tooltip: textWidth > elWidth,
          width: elWidth,
        };

        res.maxWidth = nextWidth;
      }

      const onlyVisible = nextItems.filter(item => item.visible);

      const isEqual = onlyVisible?.length === items.length;
      setHasHideElements(!isEqual);

      if (isOnlyVisible) {
        const lastIndex = onlyVisible.length - 1;
        onlyVisible[lastIndex] = {
          ...onlyVisible[lastIndex],
          width: res.maxVisibleWidth - (onlyVisible[lastIndex].width || 0),
        };
      }

      if (!isEqual) {
        const lastForceIndex = onlyVisible.findIndex(el => el.isLastForceVisible);
        onlyVisible[lastForceIndex] = {
          ...onlyVisible[lastForceIndex],
          tooltip: true,
        };
      }

      setMetaItems(onlyVisible);

      setVisible(true);
    }, 0);
  }, [metaKey, isTextCut]);

  const visibleItems = isVisible ? metaItems : stateItems;

  const textWrapper = (tooltip: boolean, text: string, el: React.ReactNode): React.ReactNode => {
    if (tooltip) {
      return (
        <Tooltip content={text} classNameTrigger={cutTextClassName}>
          {el}
        </Tooltip>
      );
    }

    return el;
  };

  if (renderItem) {
    return (
      <ContainerStyled
        className={className}
        ref={breadcrumbsEl}
        style={{ visibility: isVisible ? 'visible' : 'hidden' }}
      >
        {stateItems.map(renderItem)}
        {children && <ChildrenContainerStyled data-extension>{children}</ChildrenContainerStyled>}
      </ContainerStyled>
    );
  }

  return (
    <ContainerStyled className={className} ref={breadcrumbsEl} style={{ visibility: isVisible ? 'visible' : 'hidden' }}>
      {visibleItems?.map((item, index) => (
        <ItemStyled
          key={item.key || item.link || item.text}
          isFixedWidth={!!isFixedWidth}
          style={{ width: item.width }}
        >
          {index !== 0 && <ChevronRightInterfaceSVG className={chevronClassName} data-chevron />}
          {textWrapper(
            item.tooltip,
            item.text,
            <ItemTextStyled
              className={itemClassName}
              data-active={item.isActive || items.length === 1 || undefined}
              data-link={item.link || undefined}
              onClick={onClick ? (e): void => onClick(e, item.link) : undefined}
            >
              {isTextCut && !isVisible ? getSubstr(item.text) : item.text}
            </ItemTextStyled>,
          )}
          {index === visibleElementsCount - 1 && hasHideElements && (
            <Collapsed data-collapsed>
              <ChevronRightInterfaceSVG className={chevronClassName} />
              <ItemTextStyled>...</ItemTextStyled>
            </Collapsed>
          )}
        </ItemStyled>
      ))}
      {children && <ChildrenContainerStyled data-extension>{children}</ChildrenContainerStyled>}
    </ContainerStyled>
  );
};
