import { useEffect, useRef, useState, useMemo } from 'react';

import { ChevronRightSVG } from '@sbercloud/icons';

import { BasicTooltip } from 'components/Tooltip';
import {
  StateItem,
  BreadcrumbItem,
} from 'components/Breadcrumbs/helpers/types';

import {
  ContainerStyled,
  ChildrenContainerStyled,
  ItemStyled,
  ItemTextStyled,
  chevronClassName,
  cutTextClassName,
} from './styled';

const isEllipsisActive = (element: HTMLElement): boolean =>
  element.offsetWidth < element.scrollWidth;

const getUniqueKey = (items: (BreadcrumbItem | StateItem)[]): string =>
  items.reduce((acc, item) => acc + item.key, '');

export interface IBreadcrumbProps {
  items: BreadcrumbItem[];
  onClick?(
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
    link?: string,
  ): void;
  className?: string;
  itemClassName?: string;
  children?: React.ReactNode;
  isFixedWidth?: boolean;
}

export const Breadcrumbs: React.FC<IBreadcrumbProps> = ({
  items,
  children,
  onClick,
  className,
  itemClassName,
  isFixedWidth,
}): JSX.Element => {
  const [isVisible, setVisible] = useState(false);
  const [hasHideElements, setHasHideElements] = useState(true);
  const [stateItems, setItems] = useState<StateItem[]>(
    items.map(item => ({ ...item, visible: true } as StateItem)),
  );
  const [metaItems, setMetaItems] = useState<StateItem[]>();
  const breadcrumbsEl = useRef<HTMLDivElement>(null);

  const stateKey = useMemo(() => getUniqueKey(items), [items]);
  const metaKey = useMemo(() => getUniqueKey(stateItems), [stateItems]);

  useEffect(() => {
    setVisible(false);
    const nextItems = items.map(
      item => ({ ...item, visible: true } as StateItem),
    );
    setItems(nextItems);
  }, [stateKey]);

  useEffect(() => {
    const el = breadcrumbsEl.current;

    if ((!el || !isEllipsisActive(el)) && !hasHideElements) {
      setMetaItems(stateItems);
      setVisible(true);
      return;
    }

    const maxWidth = el?.offsetWidth || 0;
    const firstChild = el?.firstChild as HTMLDivElement;
    const firstChildWidth = firstChild.offsetWidth;

    const elementChildren = [
      ...Array.from(el?.children || []),
    ] as HTMLDivElement[];

    const extensionWidth = elementChildren.reduce((acc, curr) => {
      if (curr.dataset.extension && curr?.offsetWidth) {
        const style = window?.getComputedStyle(curr);
        const margin =
          parseFloat(style.marginLeft) + parseFloat(style.marginRight);

        return acc + (curr?.offsetWidth || 0) + (margin || 0);
      }
      return acc;
    }, 0);
    const children = elementChildren?.filter(el => !el.dataset.extension);

    const nextItems = [...items] as StateItem[];
    nextItems[0] = {
      ...nextItems[0],
      visible: true,
      tooltip: false,
    };

    const res = {
      maxWidth: maxWidth - firstChildWidth - extensionWidth,
    };

    for (let i = children.length - 1; i > 0; i--) {
      const isLast = children.length - 1 === i;
      const child = children[i];
      const textEl = child.querySelector('p');
      const hasTooltip = Boolean(textEl && isEllipsisActive(textEl));

      const nextWidth = res.maxWidth - child.offsetWidth;

      const lastElementWidth =
        nextWidth > 0 && children.length > 2 ? undefined : res.maxWidth;

      if (nextWidth < 0 && !isLast) {
        break;
      }

      nextItems[i] = {
        ...nextItems[i],
        visible: true,
        tooltip: hasTooltip,
        width: lastElementWidth,
      };

      res.maxWidth = nextWidth;
    }

    const onlyVisible = nextItems.filter(item => item.visible);
    setMetaItems(onlyVisible);

    const isEqual = onlyVisible?.length === items.length;
    setHasHideElements(!isEqual);

    setVisible(true);
  }, [metaKey]);

  const visibleItems = isVisible ? metaItems : stateItems;

  const textWrapper = (
    tooltip: boolean,
    text: string,
    el: React.ReactNode,
  ): React.ReactNode => {
    if (tooltip) {
      return (
        <BasicTooltip tooltip={text} classNameTrigger={cutTextClassName}>
          {el}
        </BasicTooltip>
      );
    }

    return el;
  };

  return (
    <ContainerStyled
      className={className}
      ref={breadcrumbsEl}
      style={{ visibility: isVisible ? 'visible' : 'hidden' }}
    >
      {visibleItems?.map((item, index) => (
        <ItemStyled
          key={item.key || item.link || item.text}
          isFixedWidth={!!isFixedWidth}
          style={{ width: item.width }}
        >
          {index !== 0 && <ChevronRightSVG className={chevronClassName} />}
          {textWrapper(
            item.tooltip || Boolean(item.width),
            item.text,
            <ItemTextStyled
              className={itemClassName}
              isActive={item.isActive || items.length === 1}
              data-link={item.link || undefined}
              onClick={onClick ? (e): void => onClick(e, item.link) : undefined}
            >
              {item.text}
            </ItemTextStyled>,
          )}
          {index === 0 && hasHideElements && (
            <>
              <ChevronRightSVG className={chevronClassName} />
              <ItemTextStyled>...</ItemTextStyled>
            </>
          )}
        </ItemStyled>
      ))}
      {children && (
        <ChildrenContainerStyled data-extension>
          {children}
        </ChildrenContainerStyled>
      )}
    </ContainerStyled>
  );
};
