import { ReactNode, useState } from 'react';

import { Divider } from '@sbercloud/uikit-product-divider';
import { DropdownUpInterfaceSVG, FavouriteInterfaceSVG } from '@sbercloud/uikit-product-icons';

import {
  ButtonGroupStyled,
  CollapseButtonStyled,
  collapseIconClassName,
  ContainerStyled,
  ContentStyled,
  ContentWrapStyled,
  favouriteButtonClassName,
  HeaderGroupStyled,
  HeaderStyled,
} from './styled';

export type CollapsePanelItemProps = {
  isCollapsed?: boolean;
  handleClick?: () => void;
  index: number;
  children: ReactNode;
  isShowFavourites?: boolean;
  isFavourite?: boolean;
  header?: ReactNode;
  isShowCollapse?: boolean;
  hasHeaderClickCollapsed?: boolean;
  hasExpandedAnimation?: boolean;
};

export function CollapsePanelItem({
  isCollapsed,
  handleClick,
  header,
  children,
  isShowFavourites = false,
  isFavourite,
  isShowCollapse,
  hasHeaderClickCollapsed,
  hasExpandedAnimation = true,
}: CollapsePanelItemProps) {
  const [isFavouriteState, setIsFavourite] = useState(isFavourite);

  return (
    <ContainerStyled showHover={hasHeaderClickCollapsed}>
      <HeaderGroupStyled
        data-clicked={hasHeaderClickCollapsed || undefined}
        onClick={hasHeaderClickCollapsed ? handleClick : undefined}
      >
        <HeaderStyled>{header}</HeaderStyled>
        <ButtonGroupStyled>
          {isShowFavourites && (
            <FavouriteInterfaceSVG
              className={favouriteButtonClassName}
              data-filled={isFavouriteState || undefined}
              onClick={() => setIsFavourite(isFavourite => !isFavourite)}
            />
          )}
          {isShowCollapse && (
            <CollapseButtonStyled onClick={handleClick} data-rotate={isCollapsed || undefined}>
              <DropdownUpInterfaceSVG className={collapseIconClassName} />
            </CollapseButtonStyled>
          )}
        </ButtonGroupStyled>
      </HeaderGroupStyled>
      <ContentWrapStyled
        data-expanded={!isCollapsed || undefined}
        data-collapsed={isCollapsed || undefined}
        data-expanded-animation={(hasExpandedAnimation && !isCollapsed) || undefined}
        aria-expanded={isCollapsed}
      >
        <ContentStyled>
          <Divider />
          {children}
        </ContentStyled>
      </ContentWrapStyled>
    </ContainerStyled>
  );
}
