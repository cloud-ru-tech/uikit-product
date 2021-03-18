import { FC, useState } from 'react';

import { StarSVG } from '@aicloud/ui-icons';

import { Card } from 'components/Cards';
import { Checkbox } from 'components/Checkbox';
import { MoreButton } from 'components/Button';

import {
  StyledHeader,
  StyledContent,
  StyledContainer,
  StyledHeaderItem,
  StyledButtonGroup,
  StyledMoreButtonWrap,
  favouriteButtonClassname,
} from './styled';

export interface ICardsPanelItemProps {
  isVertical: boolean;
  selected?: boolean;
  additionalHover?: boolean;
  header?: string | React.ReactNode;
  defaultFavorite?: boolean;
  onClick?(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  onFavoriteChange?(isFavorite: boolean): void;
  checked?: boolean;
  onCheckedClick?(check: boolean): void;
  moreActions?: {
    name: string;
    onClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
  }[];
  className?: string;
}

export const CardsPanelItem: FC<ICardsPanelItemProps> = props => {
  const {
    defaultFavorite = false,
    onFavoriteChange,
    children,
    header,
    checked,
    onCheckedClick,
    moreActions,
    onClick,
    className,
    additionalHover,
    selected,
    isVertical,
  } = props;

  const [isFavorite, setIsFavorite] = useState(defaultFavorite);

  const handlerCardClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    const target = e.target as HTMLButtonElement;
    if (target?.id !== 'more-button' && onClick) {
      onClick(e);
    }
  };

  const handleFavoriteClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void => {
    e.stopPropagation();
    const newFav = !isFavorite;
    setIsFavorite(newFav);

    if (onFavoriteChange) {
      onFavoriteChange(newFav);
    }
  };

  const handleCheckedClick = (
    check: boolean,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void => {
    e.stopPropagation();

    if (onCheckedClick) {
      onCheckedClick(check);
    }
  };

  return (
    <Card
      isVertical={isVertical}
      additionalHover={additionalHover}
      selected={selected}
      onClick={handlerCardClick}
      className={className}
    >
      <StyledContainer>
        <StyledHeader>
          {onCheckedClick && checked !== undefined && (
            <Checkbox value={checked || false} onChange={handleCheckedClick} />
          )}
          {header && <StyledHeaderItem>{header}</StyledHeaderItem>}
        </StyledHeader>
        <StyledContent>{children}</StyledContent>
        <StyledButtonGroup>
          {onFavoriteChange && (
            <div onClick={handleFavoriteClick}>
              <StarSVG
                className={favouriteButtonClassname}
                data-filled={isFavorite}
              />
            </div>
          )}
          {moreActions && (
            <StyledMoreButtonWrap>
              <MoreButton actions={moreActions} />
            </StyledMoreButtonWrap>
          )}
        </StyledButtonGroup>
      </StyledContainer>
    </Card>
  );
};
