import { Children, isValidElement, ReactNode, useState } from 'react';

import { CollapsePanelItem } from '../CollapsePanelItem';
import { ContainerStyled } from './styled';

export type CollapsePanelProps = {
  children: ReactNode;
  defaultIndex?: number;
  onItemClick?: (props: number) => void;
  onFavouritesClick?: (props: number) => void;
  isShowFavourites?: boolean;
  isShowCollapse?: boolean;
  hasHeaderClickCollapsed?: boolean;
};

// TODO: рефактор, контекст + убрать лишние пропсы + желательно избавиться от завязки на className
export function CollapsePanel({
  defaultIndex,
  onItemClick,
  children,
  isShowFavourites,
  isShowCollapse = true,
  hasHeaderClickCollapsed = false,
}: CollapsePanelProps) {
  const [bindIndex, setBindIndex] = useState(defaultIndex);
  const changeItem = (itemIndex: number) => {
    if (typeof onItemClick === 'function') {
      onItemClick(itemIndex);
    }

    if (itemIndex !== bindIndex) {
      setBindIndex(itemIndex);
    } else {
      setBindIndex(-1);
    }
  };

  return (
    <ContainerStyled>
      {Children.map(children, child => {
        if (isValidElement(child)) {
          const { props } = child;

          return (
            <CollapsePanelItem
              isShowFavourites={isShowFavourites}
              key={props.index}
              isShowCollapse={isShowCollapse}
              hasHeaderClickCollapsed={hasHeaderClickCollapsed}
              isCollapsed={bindIndex !== props.index}
              handleClick={() => changeItem(props.index)}
              {...props}
            >
              {props.children}
            </CollapsePanelItem>
          );
        }

        return child;
      })}
    </ContainerStyled>
  );
}
