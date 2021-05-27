import { FC, useState } from 'react';

import { FavSVG } from '@sbercloud/icons';
import { MoreButton } from '@sbercloud/uikit-react-button';
import { Checkbox } from '@sbercloud/uikit-react-checkbox';

import {
  ButtonGroupStyled,
  FavouriteWrapStyled,
  HeaderStyled,
  favouriteButtonClassName,
  moreButtonClassName,
} from './styled';

export type CardHeaderProps = {
  checked?: boolean;
  className?: string;
  defaultFavourite?: boolean;
  onCheckboxClick?: (check: boolean, e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => void;
  onFavouriteChange?: (isFavourite: boolean) => void;
  moreActions?: {
    name: string;
    onClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
  }[];
};

export const CardHeader: FC<CardHeaderProps> = props => {
  const {
    checked,
    className,
    moreActions,
    onCheckboxClick,
    onFavouriteChange,
    children,
    defaultFavourite = false,
  } = props;

  const [isFavourite, setIsFavourite] = useState(defaultFavourite);

  const handleFavouriteClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    e.stopPropagation();
    const newFavouriteValue = !isFavourite;
    setIsFavourite(newFavouriteValue);

    if (onFavouriteChange) {
      onFavouriteChange(newFavouriteValue);
    }
  };

  const handleCheckedClick = (check: boolean, e: React.MouseEvent<HTMLLabelElement, MouseEvent>): void => {
    e.stopPropagation();

    if (onCheckboxClick) {
      onCheckboxClick(check, e);
    }
  };

  return (
    <HeaderStyled className={className}>
      {onCheckboxClick && typeof checked === 'boolean' && (
        <Checkbox checked={checked || false} handleChange={handleCheckedClick} />
      )}
      {children}
      <ButtonGroupStyled>
        {onFavouriteChange && (
          <FavouriteWrapStyled onClick={handleFavouriteClick}>
            <FavSVG className={favouriteButtonClassName} data-filled={isFavourite} />
          </FavouriteWrapStyled>
        )}
        {moreActions && <MoreButton actions={moreActions} className={moreButtonClassName} />}
      </ButtonGroupStyled>
    </HeaderStyled>
  );
};
