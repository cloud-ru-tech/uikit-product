import { FC, useState } from 'react';

import { StarSVG, ArrowUpSVG } from '@sbercloud/icons';

import { Divider } from 'components/Divider';

import {
  HeaderStyled,
  ContentStyled,
  ContainerStyled,
  ContentWrapStyled,
  ButtonGroupStyled,
  HeaderGroupStyled,
  CollapseButtonStyled,
  collapseIconClassName,
  favouriteButtonClassName,
} from './styled';

export interface ICollapsePanelItemProps {
  isCollapsed?: boolean;
  handleClick?: () => void;
  index: number;
  isShowFavourites?: boolean;
  isFavourite?: boolean;
  header: React.ReactNode;
  isShowCollapse?: boolean;
  hasHeaderClickCollapsed?: boolean;
  hasExpandedAnimation?: boolean;
  lineColor?: string;
}

export const CollapsePanelItem: FC<ICollapsePanelItemProps> = ({
  isCollapsed,
  handleClick,
  header,
  children,
  isShowFavourites = false,
  isFavourite,
  isShowCollapse,
  hasHeaderClickCollapsed,
  hasExpandedAnimation = true,
  lineColor,
}) => {
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
            <StarSVG
              className={favouriteButtonClassName}
              data-filled={isFavouriteState || undefined}
              onClick={() => setIsFavourite(isFavourite => !isFavourite)}
            />
          )}
          {isShowCollapse && (
            <CollapseButtonStyled
              onClick={handleClick}
              data-rotate={isCollapsed || undefined}
            >
              <ArrowUpSVG className={collapseIconClassName} />
            </CollapseButtonStyled>
          )}
        </ButtonGroupStyled>
      </HeaderGroupStyled>
      <ContentWrapStyled
        data-expanded={!isCollapsed || undefined}
        data-collapsed={isCollapsed || undefined}
        data-expanded-animation={
          (hasExpandedAnimation && !isCollapsed) || undefined
        }
        aria-expanded={isCollapsed}
      >
        <ContentStyled>
          <Divider color={lineColor} />
          {children}
        </ContentStyled>
      </ContentWrapStyled>
    </ContainerStyled>
  );
};
