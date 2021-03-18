import { FC, useState } from 'react';

import { StarSVG } from '@aicloud/ui-icons';

import { Checkbox } from 'components/Checkbox';
import { MoreButton } from 'components/Button';

import {
  StyledHeader,
  StyledButtonGroup,
  StyledFavouriteWrap,
  moreButtonClassName,
  favouriteButtonClassName,
} from './styled';

export interface ICardHeaderProps {
  checked?: boolean;
  className?: string;
  defaultFavourite?: boolean;
  onCheckboxClick?: (
    check: boolean,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void;
  onFavouriteChange?: (isFavourite: boolean) => void;
  moreActions?: {
    name: string;
    onClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
  }[];
}

export const CardHeader: FC<ICardHeaderProps> = props => {
  const {
    checked,
    className,
    moreActions,
    onCheckboxClick,
    onFavouriteChange,
    defaultFavourite = false,
  } = props;

  const [isFavourite, setIsFavourite] = useState(defaultFavourite);

  const handleFavouriteClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void => {
    e.stopPropagation();
    const newFavouriteValue = !isFavourite;
    setIsFavourite(newFavouriteValue);

    if (onFavouriteChange) {
      onFavouriteChange(newFavouriteValue);
    }
  };

  const handleCheckedClick = (
    check: boolean,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void => {
    e.stopPropagation();

    if (onCheckboxClick) {
      onCheckboxClick(check, e);
    }
  };

  return (
    <StyledHeader className={className}>
      {onCheckboxClick && checked !== undefined && (
        <Checkbox value={checked || false} onChange={handleCheckedClick} />
      )}
      <StyledButtonGroup>
        {onFavouriteChange && (
          <StyledFavouriteWrap onClick={handleFavouriteClick}>
            <StarSVG
              className={favouriteButtonClassName}
              data-filled={isFavourite}
            />
          </StyledFavouriteWrap>
        )}
        {moreActions && (
          <MoreButton actions={moreActions} className={moreButtonClassName} />
        )}
      </StyledButtonGroup>
    </StyledHeader>
  );
};
